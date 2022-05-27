import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserDTO } from './dto/create-user-dto';
import { EditUserDTO } from './dto/edit-user.dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('all')
    async getAllUsers() : Promise<object[]> {
        return await this.userService.getAllUsers();
    }

    @Post('create')
    async createUser(@Request() req, @Body() createUserDto: CreateUserDTO) : Promise<object> {
        return await this.userService.createUser(req.user.role, createUserDto);
    }

    // this function allows user to update any user on a table.
    // @Put('update/:id')
    // async editUser(@Param('id') id: string,  @Body() editUserDto: EditUserDTO): Promise<object>{
    //     return await this.userService.editUser({
    //         where: { id: Number(id) },
    //         data: editUserDto,
    //     });
    // }

    @Put('update/me')
    async updateMe(@Request() req: any,  @Body() editUserDto: EditUserDTO): Promise<object>{
        return await this.userService.editUser({
            where: { id:  req.user.id},
            data: editUserDto,
        });
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id') id: string, ): Promise<object>{
        return await this.userService.deleteUser({id: Number(id)})
    }
 
  
}
