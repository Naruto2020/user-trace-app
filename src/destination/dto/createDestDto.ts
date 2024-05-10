import { IsNotEmpty } from "class-validator";

export class CreateDestDto {
    @IsNotEmpty()
    address: string;
    @IsNotEmpty()
    destinationLat: number
    @IsNotEmpty()
    destinationLng: number 
}