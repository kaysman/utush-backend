import { PrismaService } from 'src/prisma/prisma.service';

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Role,
  User,
} from '@prisma/client';

import {
  CreateCoinDTO,
  GetCoinByNumberDTO,
  UpdateCoin,
} from './dto';

@Injectable()
export class CoinService {
  constructor(private prisma: PrismaService) {}

  async createSingleCoin(createCoinDto: CreateCoinDTO) {
    try {
      var newCoin = await this.prisma.coin.create({ data: createCoinDto });
      return newCoin;
    } catch (error) {
      throw error;
    }
  }

  async getCoinByNumber(userId: number, dto: GetCoinByNumberDTO) {
    try {
      const checkUser = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (checkUser.id === userId && checkUser.role !== Role.BUSINESS_USER) {
        const getCoin = await this.prisma.coin.findFirst({
          where: {
            randomizedNumber: dto.randomizedNumber,
          },
        });
        if (getCoin) {
          const coin = await this.prisma.coin.update({
            where: {
              id: getCoin.id,
            },
            data: {
              isUsed: true,
            },
          });
          return coin.text;
        } else
          return new NotFoundException(
            'could not find Coin with the given number',
          );
      } else
        return new ForbiddenException(
          'Business users cannot check ticket details',
        );
    } catch (error) {
      throw error;
    }
  }

  async getAllCoins(userId: number, lotteryId: number) {
    try {
      const checkUser = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (checkUser.role !== Role.END_USER) {
        const getCoins = await this.prisma.coin.findMany({
          where: {
            lotteryId: lotteryId,
          },
        });
        if (getCoins) return getCoins;
        else
          return new NotFoundException(
            'cannot find utushGozle with the given Id',
          );
      } else return new ForbiddenException('You cannot get Coin details');
    } catch (error) {
      throw error;
    }
  }

  async updateCoin(user: User, dto: UpdateCoin) {
    try {
      if (user.role === Role.ADMIN) {
        const checklottery = await this.prisma.lottery.findUnique({
          where: {
            id: dto.lotteryId,
          },
        });
        if (checklottery) {
          const updateCoin = await this.prisma.coin.update({
            where: {
              id: dto.coinId,
            },
            data: {
              prizeType: dto.prizeType,
              hasPrize: dto.hasPrize,
              randomizedNumber: dto.randomizedNumber,
              text: dto.text,
            },
          });
          if (updateCoin) return updateCoin;
          else
            return new NotFoundException('Cannot find coin with the given id');
        } else
          return new NotFoundException(
            'Cannot find utushGozle with the given id',
          );
      } else return new ForbiddenException('Only ADMIN can edit coins');
    } catch (error) {
      throw error;
    }
  }
}
