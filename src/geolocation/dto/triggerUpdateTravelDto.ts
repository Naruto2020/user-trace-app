import {IsNotEmpty, IsOptional,} from "class-validator";

export class TriggerUpdateTravelDto {
    @IsOptional()
    departureTime: string;
    @IsOptional()
    arrivalTime: string;
}