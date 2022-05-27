import { CoinService } from 'src/coin/coin.service';
import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

import { CreateUtusGozleDTO } from './dto/create-utus-gozle.dto';

@Injectable()
export class UtushGozleService {
  constructor(
    private prisma: PrismaService,
    private coinService: CoinService,
  ) {}

  // create utushgozle
  async createUtushGozle(dto: CreateUtusGozleDTO) {
    return dto;
    // var newUtushGozle = await this.prisma.utushGozle.create({ data: dto });
    // await this.coinService.createSingleCoin();
    // return newUtushGozle;
  }

  // get utushgozles

  // get utushgozle by its id

  // update utushgozle

  // delete utushgozle
}
