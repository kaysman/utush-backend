import { ApiResponse } from 'src/shared/dto/api_response.dto';

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CoinService } from './coin.service';
import {
  GetCoinByNumberDTO,
  UpdateCoin,
} from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('coins')
export class CoinController {
  constructor(private coinService: CoinService) {}

  // get all coins
  @Get('allCoins/:id')
  async getAllCoins(
    @Request() req: any,
    @Param('id', ParseIntPipe) utushGozleId: number,
  ) {
    var apiResponse = new ApiResponse();
    try {
      var res = await this.coinService.getAllCoins(req.user.id, utushGozleId);
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

  // get coin with given coinid
  @Get()
  async getCoinByNumber(@Request() req: any, @Body() dto: GetCoinByNumberDTO) {
    var apiResponse = new ApiResponse();
    try {
      var res = await this.coinService.getCoinByNumber(req.user.id, dto);
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

  //update coin with given coinid
  @Put('update')
  async updateCoin(@Request() req: any, @Body() dto: UpdateCoin) {
    var apiResponse = new ApiResponse();
    try {
      var res = await this.coinService.updateCoin(req.user, dto);
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
}
