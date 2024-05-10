import { Module } from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { DestinationService } from 'src/destination/destination.service';
import { DepartureService } from 'src/departure/departure.service';

@Module({
  providers: [TravelService, DestinationService, DepartureService],
  controllers: [TravelController]
})
export class TravelModule {}
