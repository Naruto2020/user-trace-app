import { ConflictException, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signupDto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable()
export class AuthService {
    constructor( private readonly prismaService: PrismaService) {}

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
