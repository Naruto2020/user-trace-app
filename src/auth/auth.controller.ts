import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SignupDto } from './dto/signupDto';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/updateUserDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('signup')
    signUp(@Body() signupDto :SignupDto): Promise<object> {
        return this.authService.signup(signupDto);
    }

    @Get('users')
    getUsers(): Promise<User[]> {
        return this.authService.getUsers();
    }

    @Put(':id')
    editUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto : UpdateUserDto): Promise<User> {
        return this.authService.editUser(id, updateUserDto);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number):Promise<number> {
        return this.authService.deleteUser(id);
    }
}
