import { ApiResponse } from 'src/shared/dto/api_response.dto';
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
    async signup(@Body() signupDTO: CreateUserDTO) {
        var apiResponse = new ApiResponse()
        try {
            var res = await this.authService.signup(signupDTO);
            apiResponse.responseCode = 200
            apiResponse.data = res
            apiResponse.message = ''
        } catch (error) {
            apiResponse.responseCode = error.responseCode
            apiResponse.message = error.toString()
        } finally{
            return apiResponse
        }
        
    }

    @Post('signin')
    async signin(@Body() loginDto: LoginTO) {
        var apiResponse = new ApiResponse()
        try {
            var res = this.authService.signin(loginDto);
            apiResponse.responseCode = 200
            apiResponse.data = res
            apiResponse.message = ''
        } catch (error) {
            apiResponse.responseCode = error.responseCode
            apiResponse.message = error.toString()
        } finally{
            return apiResponse
        }
    }
}