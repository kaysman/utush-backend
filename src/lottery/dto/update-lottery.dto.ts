import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class updateLotteryDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    bannerImage: string;
  
    @IsDate()
    @IsOptional()
    from?: Date;
  
    @IsDate()
    @IsOptional()
    to?: Date;

    @IsString()
    @IsOptional()
    description? : string;
}
