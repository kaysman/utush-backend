import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

import { PrizeType } from '@prisma/client';

export class CreateUtusGozleDTO {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  coinTotalCount: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  coinSpecialCount: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  lotteryId: number;

  @Type(() => PrizeDTO)
  @IsNotEmpty()
  prizes: PrizeDTO[];
}

export class PrizeDTO {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  prizeCount: number;

  @IsString()
  @IsNotEmpty()
  prizeName: string;

  @IsEnum(PrizeType)
  @IsNotEmpty()
  prizeType: PrizeType;
}
