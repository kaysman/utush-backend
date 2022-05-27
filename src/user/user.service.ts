import { PrismaService } from 'src/prisma/prisma.service';
import { hashString } from 'src/shared/helper';

import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import {
  Prisma,
  Role,
} from '@prisma/client';

import { CreateUserDTO } from './dto/create-user-dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers(): Promise<object[]> {
    var users = await this.prismaService.user.findMany();
    return users;
  }

  async getUserByEmail(email: string): Promise<object> {
    try {
      var user = await this.prismaService.user.findUnique({
        where: {
          email: email,
        },
      });
      delete user.hash;
      return user;
    } catch (error) {
      throw null;
    }
  }

  async createUser(userRole: Role, dto: CreateUserDTO): Promise<object> {
    if (userRole === Role.ADMIN) {
      var hashedP = await hashString(dto.hash);
    var newUser = await this.prismaService.user.create({
      data: {
        email: dto.email,
        hash: hashedP,
        role: dto.role,
        phonenumber: dto.phoneNumber,
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });
    delete newUser.hash;
    return newUser;
    } else {
      return new ForbiddenException("You don't permission to create user.")
    }
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
