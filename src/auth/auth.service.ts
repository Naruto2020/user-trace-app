import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signupDto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/updateUserDto';
import { SigninDto } from './dto/signinDto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express'; 
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

  constructor( private readonly prismaService: PrismaService, private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

  async signup(signupDto: SignupDto): Promise<object> {

    try {
      const {email, password, name} = signupDto;
      // check if user already exist 
      const user = await this.prismaService.user.findUnique({where: {email}});
      if(user) throw new ConflictException('User already exist');
      const hash = await bcrypt.hash(password, 10);
      await this.prismaService.user.create({
        data: {email, name, password: hash}
      });
      return {data : 'User succefully created'};
        
    } catch (error) {
      return error;
    }
  }

  async signin(signinDto: SigninDto, res: Response) {
    const {email, password} = signinDto;
    const user = await this.prismaService.user.findUnique({where: {email}});
    if(!user) throw new NotFoundException('user not found');
    const match = await bcrypt.compare(password, user.password);
    if(!match) throw new UnauthorizedException('password does not match');

    const payload = {
        sub: user.id,
        email: user.email
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get<number>('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(payload);

    this.setAuthenticationCookie(res , token, expires)
    return {token, user: {
      name: user.name,
      email: user.email
    }};
      
  }

  setAuthenticationCookie(res: Response, token: string, expires: Date): string {
    res.cookie('Authentication', token, {
      httpOnly: true,
      expires: expires,
    });
    return res.getHeader('set-cookie')as string;
  }
    

  async getUsers(): Promise<User[]> {
    try {
      const users =  await this.prismaService.user.findMany();
      return users;
        
    } catch (error) {
      return error;
    }
  }

  async editUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try{
      const {name} = updateUserDto;
      const updatedUser = await this.prismaService.user.update({
        where: { id: id },
        data: { name: name },
      });
      return updatedUser;
    }catch(err) {
      throw err;
    }
  }

  async deleteUser(id: number): Promise<number> {
    try{
      const deletedUser = await this.prismaService.user.delete({
        where: {id: id}
      });
      return deletedUser.id;
    }catch(err){
      throw err;
    }
  }

}
