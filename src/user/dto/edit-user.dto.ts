import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditUserDTO {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    email? : string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    hash? : string;

    @IsString()
    @IsOptional()
    firstName? : string;

    @IsString()
    @IsOptional()
    lastName? : string;

    @IsString()
    @IsOptional()
    phoneNumber? : string
}
