import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class JwtCookieAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    //console.log("request.headers --> : ", request);
    const cookieHeader = request.headers.cookie;
    const cookie = cookieHeader.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
    }, {});

    if (!cookie) {
      throw new UnauthorizedException('Unauthorized');
    }

    // Définir le jeton JWT dans l'en-tête d'autorisation pour PassportStrategy
    request.headers['authorization'] = `Bearer ${cookie['Authentication']}`;

    return super.canActivate(context);
  }
}
