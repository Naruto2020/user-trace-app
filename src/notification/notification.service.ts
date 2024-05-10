import { Injectable } from '@nestjs/common';
import { CreateNotificationtionDto } from './dto/createNotificationDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Travel } from '@prisma/client';

@Injectable()
export class NotificationService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createNotificationDto: CreateNotificationtionDto, userId: number, travelId: number) {
        let {message} = createNotificationDto;
        // check if is start or finish notification 
        const currentTrip = await this.prismaService.travel.findFirst({where: {id: travelId}})
        const currentUser = await this.prismaService.user.findUnique({where: {id: userId}})
        
        const tripDepartureTime = currentTrip.departureTime;
        const tripeArrivalTime = currentTrip.arrivalTime;
       //formated  hour 
       const departureDateFormatted = this.formatedHours(tripDepartureTime);
       const arrivalDateFormated = this.formatedHours(tripeArrivalTime);

        // Calcul de l'heure d'arrivé 
        const tripTime = await this.calculateTripTime(currentTrip);
        const dateObject = new Date(currentTrip.departureTime);
        const tripTimeArrived = this.calculateArrivedHour(dateObject, tripTime);
        const tripTimeArrivedFormatted = tripTimeArrived.toLocaleString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });

        if(currentTrip.arrivalTime === "") {
            message = `${currentUser.name} a commencer le trajet le ${departureDateFormatted} et va arrivé le ${tripTimeArrivedFormatted}`
        } else {
            message = `${currentUser.name} est arrivé le  ${arrivalDateFormated}`
        }
        const newNotification = await this.prismaService.notification.create({data : {message, userId, travelId}});
        return newNotification;
    }

    formatedHours(hour: any) {
        if(typeof hour === "string" ) {
            const dateDepartObj = new Date(hour);
            const dateDepartFormattee = dateDepartObj.toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            });
            return dateDepartFormattee;
        }
    }

    async calculateTripTime(currentTrip: Travel) {
        let userStartLat = 0;
        let userStartLon = 0;
        let userFinishLat = 0;
        let userFinishLon = 0;

        const currentUserDeparture = await this.prismaService.departure.findUnique({where :{id: currentTrip.departureId}});
        const currentUserDestination = await this.prismaService.destination.findUnique({where: {id: currentTrip.destinationId}});
        if(currentUserDeparture) {
            userStartLat = parseFloat(currentUserDeparture.departureLat.toString());
            userStartLon = parseFloat(currentUserDeparture.departureLng.toString());
        }
        if(currentUserDestination) {
            userFinishLat = parseFloat(currentUserDestination.destinationLat.toString());
            userFinishLon = parseFloat(currentUserDestination.destinationLng.toString());
        }

        // Calcul de la distance entre le point de départ et la destination
        const distanceKm = await this.distanceEntrePoint(userStartLat, userStartLon, userFinishLat, userFinishLon);

        // Vitesse de déplacement à pied en kilomètres par heure
        const vitesseVoitureKmh = 50; 

        // Calcul du temps de trajet à pied en heures
        const hourTripTimes = distanceKm / vitesseVoitureKmh;
        //const formattedTripTimes = this.convertTimes(hourTripTimes);
        return hourTripTimes;
    }

    calculateArrivedHour(heureDepart: Date, tempsTrajetHeures: number): Date {
        const heureArrivee = new Date(heureDepart.getTime() + tempsTrajetHeures * 3600000); // Convertir les heures en millisecondes
        return heureArrivee;
    }

    async distanceEntrePoint(lat1: number, lon1: number, lat2: number, lon2: number) {
        const R = 6371; // Rayon de la Terre en kilomètres
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance en kilomètres
        return distance;
    }

    // Fonction pour convertir les degrés en radians
    deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }
}


