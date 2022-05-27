import { Module } from '@nestjs/common';

import { AksiyaService } from './aksiya.service';

@Module({
    providers: [AksiyaService],
    exports: [AksiyaService],
})

export class AksiyaModule {}

