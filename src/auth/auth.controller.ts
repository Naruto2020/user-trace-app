import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Res, UseGuards, HttpStatus  } from '@nestjs/common';
import { SignupDto } from './dto/signupDto';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/updateUserDto';
import { SigninDto } from './dto/signinDto';
import { AuthGuard } from '@nestjs/passport';
import { Request} from 'express';
import { Response } from 'express'; 
import { JwtCookieAuthGuard } from '../jwt-cookie/jwt-cookie-auth.guard';



@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('signup')
    signUp(@Body() signupDto :SignupDto): Promise<object> {
        return this.authService.signup(signupDto);
    }

    @Post('signin')
    async signin(@Body() signinDto: SigninDto, @Res() res: Response): Promise<any> {

        try {
            const { token, user } = await this.authService.signin(signinDto, res);
            return res.status(HttpStatus.CREATED).json({ token, user });
          } catch (error) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
        }
      
    }

    @Get('users')
    @UseGuards(JwtCookieAuthGuard)
    getUsers(): Promise<User[]> {
        return this.authService.getUsers();
    }

    @Put(':id')
    @UseGuards(JwtCookieAuthGuard)
    editUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto : UpdateUserDto): Promise<User> {
        return this.authService.editUser(id, updateUserDto);
    }

    @Delete(':id')
    @UseGuards(JwtCookieAuthGuard)
    @UseGuards(JwtCookieAuthGuard)
    deleteUser(@Req() request: Request):Promise<number> {
        const userId = request.user['id'];
        return this.authService.deleteUser(userId);
    }
}
