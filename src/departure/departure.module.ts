import { Module } from '@nestjs/common';
import { DepartureService } from './departure.service';
import { DepartureController } from './departure.controller';
import { DestinationService } from 'src/destination/destination.service';

@Module({
  providers: [DepartureService, DestinationService],
  controllers: [DepartureController],
  exports: [DepartureService],
})
export class DepartureModule {}
