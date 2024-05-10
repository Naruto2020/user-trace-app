import { IsNotEmpty } from "class-validator";
import { DateTime } from "luxon";

export class CreateGeolocationDto {
    @IsNotEmpty()
    latitude: number;
    @IsNotEmpty()
    longitude: number;
    @IsNotEmpty()
    timestamp: string;
    userId: number;
}