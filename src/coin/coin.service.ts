import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

import { CreateCoinDTO } from './dto';

@Injectable()
export class CoinService {
    constructor(private prisma: PrismaService) {}

    async createSingleCoin(createCoinDto : CreateCoinDTO) {
        var newCoin = await this.prisma.coin.create({data: createCoinDto});
        return newCoin;
    }


    async generateCoins(dto: CreateCoinDTO ) {
        // var newCoins = [];
        // for (var i = 0; i <= dto.count; i++) {
        //     console.log(i);
        //     var coin = await this.createSingleCoin(dto);
        //     // if (coin) {
        //     //     newCoins.push(coin);
        //     // }
        // }
    }


}