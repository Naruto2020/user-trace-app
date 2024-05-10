import { Module } from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { DestinationService } from 'src/destination/destination.service';
import { DepartureService } from 'src/departure/departure.service';
import { NotificationService } from 'src/notification/notification.service';
import { DestinationModule } from 'src/destination/destination.module';

@Module({
  imports: [DestinationModule],
  providers: [TravelService, DestinationService, DepartureService, NotificationService],
  controllers: [TravelController]
})
export class TravelModule {}
