import { Body, Controller, Post } from '@nestjs/common';
import { DepartureService } from './departure.service';
import { CreateDeptDto } from './dto/createDepDto';

@Controller('departure')
export class DepartureController {
    constructor(private departureService: DepartureService) {}

    @Post('create')
    create(@Body() createDeptDto: CreateDeptDto) {
        return this.departureService.create(createDeptDto)
    }
}
 