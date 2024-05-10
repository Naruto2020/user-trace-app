import { Injectable } from '@nestjs/common';
import { CreateDestDto } from './dto/createDestDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DestinationService {
    constructor(private readonly prismaService: PrismaService) {}
    async create(createDestDto: CreateDestDto) {
        try {
            const {address, destinationLat, destinationLng} = createDestDto;
            return await this.prismaService.destination.create({data: {address, destinationLat, destinationLng}});
            
        } catch (error) {
            return error;
        }
    }
}
