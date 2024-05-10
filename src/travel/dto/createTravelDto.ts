import { IsNotEmpty } from "class-validator";

export class CreateTravelDto {
    @IsNotEmpty()
    departureTime: string;
    arrivalTime: string;
    userId: number;
    destinationId: number;
    departureId: number;

}