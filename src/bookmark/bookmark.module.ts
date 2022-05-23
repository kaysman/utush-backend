import { UserModule } from 'src/user/user.module';

import { Module } from '@nestjs/common';

import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';

@Module({
  controllers: [BookmarkController],
  providers: [BookmarkService],
  imports: [UserModule],
})
export class BookmarkModule {}
