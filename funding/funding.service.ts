import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreatePoolDto } from './dto/create-pool.dto';

@Injectable()
export class FundingService {
  constructor(private prisma: PrismaService) {}

  async createPool(dto: CreatePoolDto) {
    return this.prisma.fundingPool.create({
      data: {
        stabId: dto.stabId,
        targetAmount: dto.targetAmount,
        revenueSharePercentage: dto.revenueSharePercentage,
        durationMonths: dto.durationMonths,
      },
    });
  }

  async getPools() {
    return this.prisma.fundingPool.findMany({
      include: {
        stab: true,
        investments: true,
      },
    });
  }

  async getPoolById(id: string) {
    return this.prisma.fundingPool.findUnique({
      where: {
        id,
      },
      include: {
        establishment: true,
        investments: true,
      },
    });
  }
}