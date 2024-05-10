import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTravelDto } from './dto/createTravelDto';
import { JwtCookieAuthGuard } from 'src/jwt-cookie/jwt-cookie-auth.guard';
import { Request} from 'express';
import { TravelService } from './travel.service';
import { CreateDestDto } from 'src/destination/dto/createDestDto';
import { CreateTravelWithDesttDto } from './dto/createTravelWithDestDto';

@Controller('travel')
export class TravelController {
    constructor(private readonly travelService: TravelService) {}

    @Post('create-travel')
    @UseGuards(JwtCookieAuthGuard)
    createTravel(@Body() createTravelWithDto: CreateTravelWithDesttDto, @Req() request: Request):Promise<object> {
        const userId = request.user['id'];
        return this.travelService.createTravel(createTravelWithDto, userId);
    }
}
