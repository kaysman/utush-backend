import { Injectable } from '@nestjs/common';

@Injectable()
export class BookmarkService  {}

  // getBookmarks(userId: number) {
  //   return this.prisma.bookmark.findMany({
  //     where: {
  //       userId: userId,
  //     },
  //   });
  // }

  // async getBookmarkById(userID: number, bookmarkId: number) {
  //   var author = await this.prisma.user.findUnique({
  //     where: { id: userID },
  //     include: { bookmarks: true },
  //   });
  //   var bookmark = author.bookmarks.filter(function (e) {
  //     return e.id === bookmarkId;
  //   });

  //   if (bookmark !== undefined && bookmark.length != 0) return bookmark;
  //   else
  //     return new NotFoundException();
  // }

  // async createBookmark(userId: number, dto: CreateBookmarkDTO) {
  //   const bkmark = await this.prisma.bookmark.create({
  //     data: {
  //       title: dto.title,
  //       link: dto.link,
  //       description: dto.description,
  //       userId: userId,
  //     },
  //   });
  //   return bkmark;
  // }

  // async editBookMark(userId: number, bookmarkId: number, dto: EditBookmarkDTO) {
  //   const update = this.prisma.bookmark.update({
  //     where: {
  //       id: bookmarkId,
  //     },
  //     data: {
  //       title: dto.title,
  //       link: dto.link,
  //       description: dto.description,
  //       userId: userId,
  //     },
  //   });
  //   return update;
  // }

  // async deleteBookmarkById(userID: number, bookmarkId: number) {
  //   const dbookmark = await this.prisma.bookmark.delete({
  //     where: {
  //       id: bookmarkId,
  //     },
  //     include: {
  //       user: true,
  //     },
  //   });
  //   return 'bookmark deleted';
  // }

