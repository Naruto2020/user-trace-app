import {IsNotEmpty, IsOptional,} from "class-validator";

export class UpdateTravelDto {
    @IsOptional()
    departureTime: string;
    @IsOptional()
    arrivalTime: string;
}