import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { PrizeType } from '@prisma/client';

export class UpdateCoin {

    @IsString()
    @IsOptional()
    randomizedNumber? : string 

    @IsEnum (PrizeType)
    @IsOptional()
    prizeType?: PrizeType
    
    @IsBoolean()
    @Type(()=> Boolean)
    @IsOptional()
    hasPrize? : boolean
    
    @IsString()
    @IsOptional()
    text?: string 

    @IsNumber()
    @Type(()=> Number)
    @IsNotEmpty()
    lotteryId : number 

    @IsNumber()
    @Type(()=> Number)
    @IsNotEmpty()    
    coinId : number 


}