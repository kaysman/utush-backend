import { PrismaService } from 'src/prisma/prisma.service';

import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';

import {
  CreateLotteryDTO,
  updateLotteryDTO,
} from './dto';

@Injectable()
export class LotteryService {
  constructor(private prisma: PrismaService) {}

  // create lottery
  async createLottery(author: User, dto: CreateLotteryDTO) {
    var newLottery = await this.prisma.lottery.create({
      data: {
        name: dto.name,
        bannerImage: dto.bannerImage,
        description: dto.description,
        type: dto.type,
        status: dto.status,
        from: dto.from,
        to: dto.to,
        authorId: author.id,
      },
    });

    return newLottery;
  }

  // get lotteries
  async getLotteries(author: User) {
    var getLottery = await this.prisma.lottery.findMany({
      where: { author: author },
    });
    return getLottery;
  }

  // get one lottery by id
  async getLotteryById(author: number, lotteryId: number) {
    var authorWithLotteries = await this.prisma.user.findUnique({
      where: {
        id: author,
      },
      include: { lotteries: true },
    });

    var lottery = authorWithLotteries.lotteries.filter(function (e) {
      return e.id === lotteryId;
    });

    if (lottery !== undefined && lottery.length != 0) return lottery;
    else return new NotFoundException('lottery given by id could not be found');
  }

  // delete lottery
  async deleteLotteryById(author: number, lotteryId: number) {
    var authorWithLotteries = await this.prisma.user.findUnique({
      where: {
        id: author,
      },
      include: { lotteries: true },
    });

    var lottery = authorWithLotteries.lotteries.filter(function (e) {
      return e.id === lotteryId;
    });
    if (lottery !== undefined && lottery.length != 0) {
      console.log('lottrery with given id is found');
      await this.prisma.lottery.delete({
        where: {
          id: lotteryId,
        },
      });
      return 'lottery with given id is deleted successfully';
    } else return 'author does not have lottery with the given id ';
  }

  // update lottery
  async updateLotteryById(
    authorId: number,
    lotteryId: number,
    dto: updateLotteryDTO,
  ) {
    var authorWithLotteries = await this.prisma.user.findUnique({
      where: {
        id: authorId,
      },
      include: { lotteries: true },
    });

    var lottery = authorWithLotteries.lotteries.filter(function (e) {
      return e.id === lotteryId;
    });
    if (lottery !== undefined && lottery.length != 0) {
      const updateLotteryById = await this.prisma.lottery.update({
        where: {
          id: lotteryId,
        },
        data: {
          name: dto.name,
          to: dto.to,
          from: dto.from,
          bannerImage: dto.bannerImage,
          description: dto.description,
        },
      });
      return updateLotteryById;
    } else return 'author does not have lottery with the given id';
  }
}
