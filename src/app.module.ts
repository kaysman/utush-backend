import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CoinModule } from './coin/coin.module';
import { LotteryModule } from './lottery/lottery.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { UtusGozleModule } from './utus-gozle/utus-gozle.module';
import { AksiyaService } from './aksiya/aksiya.service';
import { AksiyaModule } from './aksiya/aksiya.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule,LotteryModule, CoinModule, UtusGozleModule, AksiyaModule],
  providers: [AksiyaService],
  
})
export class AppModule {}
