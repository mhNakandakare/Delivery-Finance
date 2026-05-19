import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import * as nacl from 'tweetnacl';
import bs58 from 'bs58';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(walletAddress: string, signature: string) {
  const nonceRecord = await this.prisma.authNonce.findUnique({
    where: {
      walletAddress,
    },
  });

  if (!nonceRecord) {
    throw new UnauthorizedException('Nonce not found');
  }

  const message = `Login at Delivery Finance: ${nonceRecord.nonce}`;

  const messageBytes = new TextEncoder().encode(message);

  const signatureBytes = bs58.decode(signature);

  const publicKeyBytes = bs58.decode(walletAddress);

  const verified = nacl.sign.detached.verify(
    messageBytes,
    signatureBytes,
    publicKeyBytes,
  );

  if (!verified) {
    throw new UnauthorizedException('Invalid signature');
  }

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

  const accessToken = this.jwtService.sign({
    sub: user.id,
    walletAddress: user.walletAddress,
  });

  return {
    accessToken,
    user,
  };
}
async requestNonce(walletAddress: string) {
  const nonce = randomUUID();

  await this.prisma.authNonce.upsert({
    where: {
      walletAddress,
    },
    update: {
      nonce,
    },
    create: {
      walletAddress,
      nonce,
    },
  });

  return {
    nonce,
  };
}
}
