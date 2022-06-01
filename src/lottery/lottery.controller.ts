import { RequirePermission } from 'src/auth/decorators/permission.decorator';
import { PermissionEnum } from 'src/auth/enums/permission.enum';
import { PermissionGuard } from 'src/auth/guards/permission.guard';
import { ApiResponse } from 'src/shared/dto/api_response.dto';

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
import { LotteryType } from '@prisma/client';

import {
  CreateLotteryDTO,
  updateLotteryDTO,
} from './dto';
import { LotteryService } from './lottery.service';

@UseGuards(AuthGuard('jwt'), PermissionGuard)
@Controller('lottery')
export class LotteryController {
  constructor(private lotteryService: LotteryService) {}

  @Post('create')
  @RequirePermission(PermissionEnum.CREATE_LOTTERY)
  async createLottery(@Request() req: any, @Body() dto: CreateLotteryDTO) {
    var apiResponse = new ApiResponse();
    try {
      var res = await this.lotteryService.createLottery(req.user, dto);
      apiResponse.responseCode = 200;
      apiResponse.data = res;
      apiResponse.message = '';
    } catch (error) {
      apiResponse.responseCode = error.responseCode;
      apiResponse.message = error.toString();
    } finally {
      return apiResponse;
    }
  }

  @Get('get')
  async getLottery(@Request() req: any) {
    var apiResponse = new ApiResponse();
    try {
      var res = await this.lotteryService.getLotteries(req.user);
      apiResponse.responseCode = 200;
      apiResponse.data = res;
      apiResponse.message = '';
    } catch (error) {
      apiResponse.responseCode = error.responseCode;
      apiResponse.message = error.toString();
    } finally {
      return apiResponse;
    } 
  }

  @Get('get/:id')
  async getLotteryById(
    @Request() req: any,
    @Param('id', ParseIntPipe) lotteryId: number,
  ) {
    var apiResponse = new ApiResponse();
    try {
      var res = await this.lotteryService.getLotteryById(req.user.id, lotteryId);
      apiResponse.responseCode = 200;
      apiResponse.data = res;
      apiResponse.message = '';
    } catch (error) {
      apiResponse.responseCode = error.responseCode;
      apiResponse.message = error.toString();
    } finally {
      return apiResponse;
    }
  }

  @Get('getLotteries/:type')
  async getLotteryByTypeUtushGozle(
    @Request() req: any,
    @Param('type') type: LotteryType,
  ) {
    var apiResponse = new ApiResponse();
    try {
      var res = await this.lotteryService.getLotteryByType(req.user.id, type);
      apiResponse.responseCode = 200;
      apiResponse.data = res;
      apiResponse.message = '';
    }catch (error) {
      apiResponse.responseCode = error.responseCode;
      apiResponse.message = error.toString();
    } finally {
      return apiResponse;
    }
   
  }

  @Delete('delete/:id')
  async deleteLotteryById(
    @Request() req: any,
    @Param('id', ParseIntPipe) lotteryId: number,
  ) {
    var apiResponse = new ApiResponse();
    try {
      var res = await this.lotteryService.deleteLotteryById(req.user.id, lotteryId);
      apiResponse.responseCode = 200;
      apiResponse.data = res;
      apiResponse.message = '';
    }catch (error) {
      apiResponse.responseCode = error.responseCode;
      apiResponse.message = error.toString();
    } finally {
      return apiResponse;
    }
    
  }

  @Put('update/:id')
  async updateLotteryById(
    @Request() req: any,
    @Param('id', ParseIntPipe) lotteryId: number,
    @Body() dto: updateLotteryDTO,
  ) {
    var apiResponse = new ApiResponse();
    try {
      var res = await this.lotteryService.updateLotteryById(req.user.id, lotteryId, dto);
      apiResponse.responseCode = 200;
      apiResponse.data = res;
      apiResponse.message = '';
    }catch (error) {
      apiResponse.responseCode = error.responseCode;
      apiResponse.message = error.toString();
    } finally {
      return apiResponse;
    }
    
  }
}
