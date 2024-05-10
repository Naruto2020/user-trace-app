import { IsNotEmpty } from "class-validator";

export class CreateTravelWithDesttDto {
    @IsNotEmpty()
     departureTime: string;
     arrivalTime: string;
     userId: number;
     destinationId: number;
     departureId: number;
     @IsNotEmpty()
     departureAddress: string;
     @IsNotEmpty()
     destinationAddress: string;
     @IsNotEmpty()
     destinationLat: number;
     @IsNotEmpty()
     destinationLng: number ;
     @IsNotEmpty()
     departureLat: number;  
     @IsNotEmpty()
     departureLng: number; 

}