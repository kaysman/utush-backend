import {
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CoinService } from './coin.service';

@UseGuards(AuthGuard('jwt'))
@Controller('coins')
export class CoinController {
    constructor(private coinService : CoinService){}

    // create coin 
    @Post ('generate')
    async createCoin (@Request() req: any){
      // return this.coinService.generateCoins(dto);
     
    }

    


    // get all coins 

    // get coin with given coinid

    //update coin with given coinid 
}

