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

export class CreateCoinDTO {

    

    @IsString()
    @IsNotEmpty()
    randomizedNumber: string;
    
    @IsNotEmpty()
    @IsBoolean()
    hasPrize: boolean

    @IsEnum(PrizeType)
    @IsOptional()
    prizeType? : PrizeType
    
    @IsNotEmpty()
    @IsBoolean()
    isUsed : boolean
    
    @IsNotEmpty()
    @IsString()
    text: string 
    
    @IsNumber()
    @Type(() => Number)
    @IsNotEmpty()
    utushGozleId: number
}