import { PrismaService } from 'src/prisma/prisma.service';
import { hashString } from 'src/shared/helper';

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateUserDTO } from './dto/create-user-dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers(): Promise<object[]> {
    var users = await this.prismaService.user.findMany();
    return users;
  }

  async getUserByEmail(email: string): Promise<object> {
    var user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    delete user.hash;
    return user;
  }

  async createUser(dto: CreateUserDTO): Promise<object> {
    var hashedP = await hashString(dto.hash);
    var newUser = await this.prismaService.user.create({
      data: {
        email: dto.email,
        hash: hashedP,
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });
    delete newUser.hash;
    return newUser;
  }

  async editUser(params: {
    where : Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  }): Promise<object> {
    const {data, where} = params;
    var updateUser = await this.prismaService.user.update({
      data, where,
    });

    return updateUser;
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput):Promise<object>{
      return await this.prismaService.user.delete({
          where,
      })
  }

  
}
