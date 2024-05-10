import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationtionDto } from './dto/createNotificationDto';

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Post('create')
    create(createNotificationDto: CreateNotificationtionDto, userId: number, travelId: number) {
        return this.notificationService.create(createNotificationDto, userId, travelId);
    }
}
