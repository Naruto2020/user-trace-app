import { Injectable } from '@nestjs/common';
import { CreateGeolocationDto } from './dto/createGeolocationDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TravelService } from 'src/travel/travel.service';
import { TriggerUpdateTravelDto } from './dto/triggerUpdateTravelDto';
import { NotificationService } from 'src/notification/notification.service';
import { TriggerCreateNotificationDto } from './dto/triggerCreateNotificationDto';

@Injectable()
export class GeolocationService {
    constructor(private readonly prismaService: PrismaService, private readonly travelService: TravelService, private readonly notificationService: NotificationService) {}

    async create(createGeolocDto: CreateGeolocationDto, userId: any) {
        const {latitude, longitude, timestamp} = createGeolocDto;
        const newGeolocation = await  this.prismaService.geolocation.create({data: {latitude, longitude, timestamp, userId}});
        // check if user arrived 
        const currentLat: number = parseFloat(newGeolocation.latitude.toString());
        const currentLon: number = parseFloat(newGeolocation.longitude.toString());
        const currentTimestamp: string = newGeolocation.timestamp.toString();

        this.checkTripOver(userId, currentLat, currentLon, currentTimestamp);

        return newGeolocation;
        
    }

    async checkTripOver(userId: any, latitude: number, longitude: number, timestamp: string) {
        let currentDestLongitude = 0;
        let currentDestLatitude = 0; 
        const currentUserTravel = await this.prismaService.travel.findFirst({where : {userId, arrivalTime: ""}});
        if(currentUserTravel) {
            const currentUserDestination = await this.prismaService.destination.findUnique({where: {id: currentUserTravel.destinationId}})
            currentDestLatitude = parseFloat(currentUserDestination.destinationLat.toString());
            currentDestLongitude = parseFloat(currentUserDestination.destinationLng.toString());
        }

        if(latitude === currentDestLatitude && longitude === currentDestLongitude) {
            let triggerUpdateTravelDto: TriggerUpdateTravelDto = {
                departureTime: currentUserTravel.departureTime,
                arrivalTime: timestamp
            };
            const updatedtravel = await  this.travelService.editTravel(currentUserTravel.id, triggerUpdateTravelDto, userId);
            let triggerCreateNotificationDto: TriggerCreateNotificationDto = {
                message: '',
                userId: userId,
                travelId: updatedtravel.id
            };
            await this.notificationService.create(triggerCreateNotificationDto, userId, updatedtravel.id)
        }

    }
}
