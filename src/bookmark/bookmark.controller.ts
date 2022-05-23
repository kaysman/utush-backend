import { UserService } from 'src/user/user.service';

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

import { BookmarkService } from './bookmark.service';
import {
  CreateBookmarkDTO,
  EditBookmarkDTO,
} from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('bookmarks')
export class BookmarkController {
  constructor(
    private bookmarkService: BookmarkService,
    userService: UserService,
  ) {}

    @Get('all')
    async getBookmarks(
    @Request() req: any) {
    return await this.bookmarkService.getBookmarks (req.user.id)

  }

    @Get('get/:bookmarkid')
    async getBookmarkById(
      @Request() req: any,
      @Param('bookmarkid', ParseIntPipe) bookmarkId: number,
    ) {
          return await this.bookmarkService.getBookmarkById (req.user.id, bookmarkId)
    }

  @Post('create')
  async createBookmark(@Request() req: any, @Body() dto: CreateBookmarkDTO) {
    return await this.bookmarkService.createBookmark(req.user.id, dto);
  }

  @Put('update/:id')
  async editBookmarkById(
    @Request() req: any, 
    @Param('id',ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDTO) {
    return await this.bookmarkService.editBookMark(req.user.id, bookmarkId, dto);
  }

    @Delete('delete/:id')
    async deleteBookmarkById(
      @Request() req:any,
      @Param('id', ParseIntPipe) bookmarkId: number,
    ) {
      return await this.bookmarkService.deleteBookmarkById(req.user.id ,bookmarkId)
    }
}
