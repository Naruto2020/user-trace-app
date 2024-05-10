import { IsNotEmpty } from "class-validator";

export class CreateNotificationtionDto {
    @IsNotEmpty()
    message: string;
    userId: number;
    travelId: number;
}