import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { Role } from '@prisma/client';

export class CreateUserDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  hash: string;

  @IsNotEmpty()
  role: Role;
  
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
  
  @IsString()
  @IsOptional()
  phoneNumber?: string;
  
}
