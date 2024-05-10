import { Injectable } from '@nestjs/common';
import { CreateDeptDto } from './dto/createDepDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartureService {
    constructor(private readonly prismaService: PrismaService) {}
    async create(createDeptDto: CreateDeptDto) {
        try {
            const {address, departureLat, departureLng} = createDeptDto;
            return await this.prismaService.departure.create({data: {address, departureLat, departureLng}});
            
        } catch (error) {
            return error;
        }
    }
}
