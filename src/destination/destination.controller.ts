import { Body, Controller, Post } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { CreateDestDto } from './dto/createDestDto';

@Controller('destination')
export class DestinationController {
    constructor(private readonly destinationService: DestinationService) {}

    @Post('create')
    create(@Body() createDestDto: CreateDestDto) {
        return this.destinationService.create(createDestDto);
    }
}
