import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import {
  CreateLotteryDTO,
  updateLotteryDTO,
} from './dto';
import { LotteryService } from './lottery.service';

@UseGuards(AuthGuard('jwt'))
@Controller('lottery')
export class LotteryController {
    constructor (private lotteryService: LotteryService){}

    @Post ('create')
    async createLottery (@Request() req: any, @Body() dto: CreateLotteryDTO){
      return this.lotteryService.createLottery(req.user, dto);
    }
    
    @Get('get')
    async getLottery (@Request() req: any){
      return this.lotteryService.getLotteries(req.user)
    }

    @Get ('get/:id')
    async getLotteryById (
      @Request() req:any, 
      @Param('id', ParseIntPipe) lotteryId: number
    ) {
      return this.lotteryService.getLotteryById (req.user.id, lotteryId)
    }

    @Delete('delete/:id')
    async deleteLotteryById (@Request() req:any, 
    @Param('id', ParseIntPipe) lotteryId: number){
      return this.lotteryService.deleteLotteryById (req.user.id, lotteryId)  
    }

    @Put('update/:id')
    async updateLotteryById (@Request() req:any, 
    @Param('id', ParseIntPipe) lotteryId: number, 
    @Body() dto: updateLotteryDTO){
      return this.lotteryService.updateLotteryById(req.user.id, lotteryId, dto)
    }
}