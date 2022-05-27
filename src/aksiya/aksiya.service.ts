import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

@Injectable()
export class AksiyaService {
  constructor(private prisma: PrismaService) {}

  async createAksiya() {
    // const newAksiya = await this.prisma.aksiya.create({
    //   data: {
        
    //   },
    // });
    // return newAksiya;
  }
}
