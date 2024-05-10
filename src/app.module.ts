import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { DestinationModule } from './destination/destination.module';
import { TravelModule } from './travel/travel.module';
import { DepartureModule } from './departure/departure.module';
import { GeolocationModule } from './geolocation/geolocation.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), AuthModule, PrismaModule, DestinationModule, TravelModule, DepartureModule, GeolocationModule, NotificationModule, ],
})
export class AppModule {}
