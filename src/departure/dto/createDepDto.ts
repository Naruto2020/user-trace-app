import { IsNotEmpty } from "class-validator";

export class CreateDeptDto {
    @IsNotEmpty()
    address: string;
    @IsNotEmpty()
    departureLat: number
    @IsNotEmpty()
    departureLng: number 
}