import { Module } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { DestinationController } from './destination.controller';
import { TravelService } from 'src/travel/travel.service';
import { DepartureService } from 'src/departure/departure.service';
import { DepartureModule } from 'src/departure/departure.module';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  imports: [DepartureModule],
  providers: [DestinationService, TravelService, DepartureService, NotificationService],
  controllers: [DestinationController]
})
export class DestinationModule {}
