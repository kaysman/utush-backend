import { CoinModule } from 'src/coin/coin.module';

import { Module } from '@nestjs/common';

import { UtushGozleController } from './utus-gozle.controller';
import { UtushGozleService } from './utus-gozle.service';

@Module({
  imports: [CoinModule],
  exports: [UtushGozleService],
  providers: [UtushGozleService],
  controllers: [UtushGozleController],
})
export class UtusGozleModule {}
