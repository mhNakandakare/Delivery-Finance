import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateStabDto } from './dto/create-stab.dto';

@Injectable()
export class StabsService {
  constructor(private prisma: PrismaService) {}

  async create(ownerId: string, dto: CreateStabDto) {
    return this.prisma.Stab.create({
      data: {
        ownerId,
        name: dto.name,
        cnpj: dto.cnpj,
        monthlyRevenue: dto.monthlyRevenue,
        description: dto.description,
      },
    });
  }

  async findAll() {
    return this.prisma.stab.findMany({
      include: {
        fundingPools: true,
      },
    });
  }
}