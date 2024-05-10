import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { GeolocationService } from './geolocation.service';
import { CreateGeolocationDto } from './dto/createGeolocationDto';
import { JwtCookieAuthGuard } from 'src/jwt-cookie/jwt-cookie-auth.guard';
import { Request} from 'express';

@Controller('geolocation')
export class GeolocationController {
    constructor(private readonly geolocationService: GeolocationService) {}

    @Post('create')
    @UseGuards(JwtCookieAuthGuard)
    create(@Body() createGeolocDto: CreateGeolocationDto, @Req() request: Request) {
        const userId = request.user['id'];
        return this.geolocationService.create(createGeolocDto, userId);
    }
}
