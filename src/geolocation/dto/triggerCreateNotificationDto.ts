import { IsNotEmpty, IsOptional } from "class-validator";

export class TriggerCreateNotificationDto {
    @IsOptional()
    message: string;
    userId: number;
    travelId: number;
}