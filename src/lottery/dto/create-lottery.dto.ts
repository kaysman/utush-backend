import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PrizeDTO } from 'src/utus-gozle/dto/create-utus-gozle.dto';

import {
  LotteryStatus,
  LotteryType,
} from '@prisma/client';

export class CreateLotteryDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  bannerImage: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(LotteryType)
  @IsNotEmpty()
  type: LotteryType;
  
  @IsEnum(LotteryStatus)
  @IsNotEmpty()
  status: LotteryStatus;

  @IsOptional()
  from?: Date;

  @IsOptional()
  to?: Date;

  ////////////////////////////utushGozle////////////
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  coinTotalCount?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  coinSpecialCount?: number;

  @IsString()
  @IsOptional()
  prizes?: PrizeDTO[];
}
