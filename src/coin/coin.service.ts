import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

import { CreateCoinDTO } from './dto';

@Injectable()
export class CoinService {
    constructor(private prisma: PrismaService) {}

    async createSingleCoin( ) {
        // var newCoin = await this.prisma.coin.create({data: dto});
        // return newCoin;
        const rndInt = generateString(7); 
        console.log(rndInt);
        
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

// declare all characters
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

console.log(generateString(5));