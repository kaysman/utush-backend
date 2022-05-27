import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { CreateUtusGozleDTO } from './dto/create-utus-gozle.dto';
import { UtushGozleService } from './utus-gozle.service';

@Controller('utush-gozle')
export class UtushGozleController {

    constructor (private utushGozleService: UtushGozleService){}


    // create utushgozle
    @Post('create')
    async createUtushGozle(@Body() dto : CreateUtusGozleDTO) {
        return await this.utushGozleService.createUtushGozle(dto);
    }

    // get utushgozles

    // get utushgozle by its id

    // update utushgozle

    // delete utushgozle

}
