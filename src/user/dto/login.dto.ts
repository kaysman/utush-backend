import {
    IsEmail, IsNotEmpty, IsString
} from 'class-validator';

export class LoginTO {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    hash: string;

}