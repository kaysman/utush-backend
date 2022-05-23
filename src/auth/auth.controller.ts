import { CreateUserDTO } from 'src/user/dto/create-user-dto';
import { LoginTO } from 'src/user/dto/login.dto';

import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body() signupDTO: CreateUserDTO) {
        return this.authService.signup(signupDTO);
    }

    @Post('signin')
    signin(@Body() loginDto: LoginTO) {
        return this.authService.signin(loginDto);
    }
}