import { IsEmail, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email : string;

    @IsString()
    @IsNotEmpty()
    hash : string;

    @IsString()
    @IsOptional()
    firstName? : string;

    @IsString()
    @IsOptional()
    lastName? : string;
}