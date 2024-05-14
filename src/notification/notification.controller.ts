import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationtionDto } from './dto/createNotificationDto';
import { JwtCookieAuthGuard } from 'src/jwt-cookie/jwt-cookie-auth.guard';

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Post('create')
    create(createNotificationDto: CreateNotificationtionDto, userId: number, travelId: number) {
        return this.notificationService.create(createNotificationDto, userId, travelId);
    }

    @Get('all-notif')
    @UseGuards(JwtCookieAuthGuard)
    getNotifications(): Promise<Notification[]> {
        return this.notificationService.getNotifications();
    }
}
