import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class GetCoinByNumberDTO {
    
    @IsString()
    @IsNotEmpty()
    randomizedNumber: string

}   
