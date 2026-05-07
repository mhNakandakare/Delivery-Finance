import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(walletAddress: string) {
    let user = await this.prisma.user.findUnique({
      where: {
        walletAddress,
      },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          walletAddress,
        },
      });
    }

    const token = this.jwtService.sign({
      sub: user.id,
      walletAddress: user.walletAddress,
    });

    return {
      accessToken: token,
      user,
    };
  }
}