import { IsNotEmpty } from "class-validator";

export class CreateTriggerNotifDto {
    @IsNotEmpty()
    message: string;
    userId: number;
    travelId: number;
}