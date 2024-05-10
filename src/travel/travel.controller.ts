import { Body, Controller, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTravelDto } from './dto/createTravelDto';
import { JwtCookieAuthGuard } from 'src/jwt-cookie/jwt-cookie-auth.guard';
import { Request} from 'express';
import { TravelService } from './travel.service';
import { CreateDestDto } from 'src/destination/dto/createDestDto';
import { CreateTravelWithDesttDto } from './dto/createTravelWithDestDto';
import { Travel } from '@prisma/client';
import { UpdateTravelDto } from './dto/updateTravelDto';

@Controller('travel')
export class TravelController {
    constructor(private readonly travelService: TravelService) {}

    @Post('create-travel')
    @UseGuards(JwtCookieAuthGuard)
    createTravel(@Body() createTravelWithDto: CreateTravelWithDesttDto, @Req() request: Request):Promise<Travel> {
        const userId = request.user['id'];
        return this.travelService.createTravel(createTravelWithDto, userId);
    }

    @Put(':id')
    @UseGuards(JwtCookieAuthGuard)
    editTravel(@Param('id', ParseIntPipe) id: number, @Body() updateTravelDto : UpdateTravelDto,  @Req() request: Request): Promise<Travel> {
        const userId = request.user['id'];
        return this.travelService.editTravel(id, updateTravelDto, userId);
    }
}
