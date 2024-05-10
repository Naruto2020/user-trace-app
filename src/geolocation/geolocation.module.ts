import { Module } from '@nestjs/common';
import { GeolocationService } from './geolocation.service';
import { GeolocationController } from './geolocation.controller';
import { TravelService } from 'src/travel/travel.service';
import { DestinationService } from 'src/destination/destination.service';
import { DepartureService } from 'src/departure/departure.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  providers: [GeolocationService, TravelService, DestinationService, DepartureService, NotificationService],
  controllers: [GeolocationController]
})
export class GeolocationModule {}
