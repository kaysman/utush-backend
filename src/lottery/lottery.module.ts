import { AksiyaModule } from 'src/aksiya/aksiya.module';
import { CoinModule } from 'src/coin/coin.module';
import { UtusGozleModule } from 'src/utus-gozle/utus-gozle.module';

import { Module } from '@nestjs/common';

import { LotteryController } from './lottery.controller';
import { LotteryService } from './lottery.service';

@Module({
  controllers: [LotteryController],
  providers: [LotteryService],
  imports: [UtusGozleModule, AksiyaModule, CoinModule],
})
export class LotteryModule {}
