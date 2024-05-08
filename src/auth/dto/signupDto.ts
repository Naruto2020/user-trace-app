import { IsEmail, IsNotEmpty,} from "class-validator";

export class SignupDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string; 
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    readonly password: string;
}