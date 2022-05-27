import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateCoinDTO {

    @IsNumber()
    @Type(() => Number)
    @IsNotEmpty()
    count: number
    
    @IsNotEmpty()
    @IsBoolean()
    isSpecial: boolean
    
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