import { CoinService } from 'src/coin/coin.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateString } from 'src/shared/helper';
import { PrizeDTO } from 'src/utus-gozle/dto/create-utus-gozle.dto';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  LotteryType,
  User,
} from '@prisma/client';

import {
  CreateLotteryDTO,
  updateLotteryDTO,
} from './dto';

@Injectable()
export class LotteryService {
  constructor(
    private prisma: PrismaService,
    private coinService: CoinService,
  ) {}

  // create lottery
  async createLottery(author: User, dto: CreateLotteryDTO) {
   try {
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
        coinSpecialCount: dto.coinSpecialCount,
        coinTotalCount: dto.coinTotalCount,
      },
    });

    if (newLottery.type === LotteryType.UTUSH_GOZLE) {
      var prizes = JSON.parse(dto.prizes.toString()) as Array<PrizeDTO>;
      var totalCount = 0;
      prizes.forEach((element) => {
        totalCount += element.prizeCount;
      });
      if (totalCount === dto.coinSpecialCount) {
        try {
          // loop each specials
          for (var i = 0; i < prizes.length; i++) {
            var prize = prizes[i];
            for (var j = 0; j < prize.prizeCount; j++) {
              var newCoin = await this.coinService.createSingleCoin({
                randomizedNumber: generateString(7),
                hasPrize: true,
                prizeType: prize.prizeType,
                isUsed: false,
                text: prize.prizeName,
                lotteryId: newLottery.id,
              });
            }
          }

          // loop unspecials
          for (var i = 0; i < dto.coinTotalCount - dto.coinSpecialCount; i++) {
            var newCoin = await this.coinService.createSingleCoin({
              randomizedNumber: generateString(7),
              hasPrize: false,
              isUsed: false,
              text: 'Tazeden barla',
              lotteryId: newLottery.id,
            });
          }

          return await this.prisma.lottery.findMany({
            where: {
              id: newLottery.id,
            },
            include: {
              coins: true,
            },
          });
        } catch (e) {
          await this.prisma.lottery.delete({
            where: {
              id: newLottery.id,
            },
          });
          throw e;
        }
      } else {
        return new BadRequestException("Special prizes aren't equal to total.");
      }
    } else {
      return 'aksiya created successfully';
    }
   } catch (error) {
     throw error
   }
  }

  // get lotteries
  async getLotteries(author: User) {
    try {
      var allLotteries = await this.prisma.lottery.findMany({
        where: { author: author },
      });
      return allLotteries;
    } catch (error) {
      throw error
    }
  }

  // get lotteries
  async getLotteryByType(authorId: number, type: LotteryType) {
    try {
      if (type !== LotteryType.AKSIYA && type !== LotteryType.UTUSH_GOZLE) {
        throw new BadRequestException();
      }
      var allLotteries = await this.prisma.lottery.findMany({
        where: {
          authorId: authorId,
          type: type,
        },
      });
      return allLotteries;
    } catch (error) {
      throw error
    }
  }

  // get one lottery by id
  async getLotteryById(author: number, lotteryId: number) {
    try {
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
    } catch (error) {
      throw error
    }
  }

  // delete lottery
  async deleteLotteryById(author: number, lotteryId: number) {
    try {
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
    } catch (error) {
      throw error
    }
  }

  // update lottery
  async updateLotteryById(
    authorId: number,
    lotteryId: number,
    dto: updateLotteryDTO,
  ) {
    try {
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
    } catch (error) {
      throw error
    }
  }

}
