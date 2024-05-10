import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      //ignoreExpiration: false
    });
  }

  async validate(payload: JwtPayload) {
    
    // const { sub } = payload;
    // if (!sub) {
    //   throw new UnauthorizedException('Invalid token payload');
    // }
    // return sub;

    const user = await this.prismaService.user.findUnique({where: {email: payload.email}});
    if(!user) throw new UnauthorizedException('ho ho ....Unauthorized');
    Reflect.deleteProperty(user, "password");
    console.log('current_user : ', user);
    return user
  }
}
