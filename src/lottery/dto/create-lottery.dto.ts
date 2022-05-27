import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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
}
