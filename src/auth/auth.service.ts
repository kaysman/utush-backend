import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashString } from 'src/shared/helper';
import { CreateUserDTO } from 'src/user/dto/create-user-dto';
import { LoginTO } from 'src/user/dto/login.dto';

import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './jwt/jwt-payload.dto';

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService,) { }

    async signup(createUserDTO: CreateUserDTO) {
        try {
            var user = await this.prisma.user.findFirst({
                where: {
                    "email": createUserDTO.email
                },
            });

            if (!user) {
                var hashedPassword = await hashString(createUserDTO.hash);
                var newUser = await this.prisma.user.create({
                    data: {
                        email: createUserDTO.email,
                        hash: hashedPassword,
                        role: createUserDTO.role,
                        firstName: createUserDTO.firstName,
                        lastName: createUserDTO.lastName,
                        phonenumber: createUserDTO.phoneNumber,
                    }
                });

                return newUser;
            } else {
                throw new ForbiddenException("User already taken")
            }

        } catch (error) {
            throw error;
        }
    }

    async signin(logindDto: LoginTO) {
        try {
            var user = await this.prisma.user.findUnique({
                where: {
                    email: logindDto.email
                }

            })

            if (user && (await argon.verify(user.hash, logindDto.hash)) ) {
                var token = await this.signToken({
                    username: logindDto.email,
                    password: logindDto.hash,
                });
                delete user.hash;
                user['token'] = token;
                return user;
            } else {
                throw new ForbiddenException("Incorrect credentials");
            }

        } catch (_) {
            throw _;
        }
        
    }

    async signToken(payload: JwtPayload): Promise<string> {
        try {
            var token = await this.jwtService.signAsync(payload);
            return token;
        } catch (_) {
            throw _;
        }
    }

    

}
