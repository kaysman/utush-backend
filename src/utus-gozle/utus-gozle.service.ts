import { CoinService } from 'src/coin/coin.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateString } from 'src/shared/helper';

import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import {
  CreateUtusGozleDTO,
  PrizeDTO,
} from './dto/create-utus-gozle.dto';

@Injectable()
export class UtushGozleService {
  constructor(
    private prisma: PrismaService,
    private coinService: CoinService,
  ) {}

  // create utushgozle
  async createUtushGozle(dto: CreateUtusGozleDTO) {
    var prizes = JSON.parse(dto.prizes.toString()) as Array<PrizeDTO>;
    var utushGozle = await this.prisma.utushGozle.findFirst({
      where: { lotteryId: dto.lotteryId },
    });

    console.log(utushGozle);

    if (utushGozle) {
      throw new BadRequestException('Utush Gozle Already Exists');
    } else {
      var totalCount = 0;
      prizes.forEach((element) => {
        totalCount += element.prizeCount;
      });
      if (totalCount === dto.coinSpecialCount) {
        try {
          var newUtushGozle = await this.prisma.utushGozle.create({
            data: {
              coinTotalCount: dto.coinTotalCount,
              coinSpecialCount: dto.coinSpecialCount,
              lotteryId: dto.lotteryId,
            },
          });

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
                utushGozleId: newUtushGozle.id,
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
              utushGozleId: newUtushGozle.id,
            });
          }

          return await this.prisma.utushGozle.findMany({
            where: {
              id: newUtushGozle.id,
            },
            include: {
              coins: true,
            },
          });
        } catch (e) {
          await this.prisma.utushGozle.delete({
            where: {
              id: newUtushGozle.id,
            },
          });
          throw e;
        }
      } else {
        return new BadRequestException("Special prizes aren't equal to total.");
      }
    }
  }

  // get utushgozles

  // get utushgozle by its id

  // update utushgozle

  // delete utushgozle
}
