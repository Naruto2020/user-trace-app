import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DestinationService } from 'src/destination/destination.service';
import { DepartureService } from 'src/departure/departure.service';
import { CreateTravelDto } from './dto/createTravelDto';
import { CreateTravelWithDesttDto } from './dto/createTravelWithDestDto';
import { CreateDeptDto } from 'src/departure/dto/createDepDto';
import { CreateDestDto } from 'src/destination/dto/createDestDto';
import { Travel } from '@prisma/client';
import { CreateTriggerNotifDto } from './dto/createTriggerNotifDto';
import { NotificationService } from 'src/notification/notification.service';
import { UpdateTravelDto } from './dto/updateTravelDto';

@Injectable()
export class TravelService {
    constructor(private readonly prismaService: PrismaService, private readonly destinationService: DestinationService, private readonly departureService: DepartureService, private readonly notificationService: NotificationService) {}

    async createTravelWithDest(createTravelDto: CreateTravelDto, userId: any):Promise<Travel> {

        const {departureTime, arrivalTime, destinationId, departureId} = createTravelDto
    
        const createdTrip = await this.prismaService.travel.create({
            data: {
                userId,
                departureId,
                destinationId,
                departureTime,
                arrivalTime,
            }
        });
        return createdTrip;
    }

    async createTravel(createTravelWithDto: CreateTravelWithDesttDto, userId: any): Promise<Travel> {
       
        const {departureAddress, destinationAddress, departureTime, arrivalTime, destinationLat, destinationLng, departureLat, departureLng} = createTravelWithDto;

        const  createTravelDto: CreateTravelDto = {
            departureTime,
            arrivalTime,
            userId,
            destinationId: 0,
            departureId: 0
        };

        const departure: CreateDeptDto = {
            address: departureAddress,
            departureLat,
            departureLng,
        }

        const destination: CreateDestDto = {
            address: destinationAddress,
            destinationLng,
            destinationLat,
        }
    
        
        const existDestination = await this.prismaService.destination.findFirst({where: {address: departureAddress, destinationLat, destinationLng}});
        const existDeparture = await this.prismaService.departure.findFirst({where: {address: destinationAddress, departureLat, departureLng}});

        if(existDeparture) {
            createTravelDto.departureId = existDeparture.id;
        }else{
            const createDeparture = await this.departureService.create(departure);
            createTravelDto.departureId = createDeparture.id;
        }

        if(existDestination) {
            createTravelDto.destinationId = existDestination.id;
        }else{
            const createDestination = await this.destinationService.create(destination);
            createTravelDto.destinationId = createDestination.id;
        }
        
        const createdTrip = await this.createTravelWithDest(createTravelDto, userId);
        let createTriggerNotifDto: CreateTriggerNotifDto = {
            message: '',
            userId: createdTrip.userId,
            travelId: createdTrip.id
        };
        this.notificationService.create(createTriggerNotifDto, createdTrip.userId, createdTrip.id);
        return createdTrip;
    }

    async editTravel(id: number, updateTravelDto: UpdateTravelDto, userId: number): Promise<Travel> {
        const {arrivalTime, departureTime} = updateTravelDto;
        const traveledited = await this.prismaService.travel.update({
            where: {id: id, userId},
            data: {arrivalTime, departureTime} 
        });
        return traveledited;
    }

}

