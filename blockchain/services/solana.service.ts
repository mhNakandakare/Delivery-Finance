import { Injectable } from '@nestjs/common';
import {
  Connection,
  PublicKey,
  clusterApiUrl,
} from '@solana/web3.js';

@Injectable()
export class SolanaService {
  private connection: Connection;

  constructor() {
    this.connection = new Connection(
      process.env.SOLANA_RPC_URL || clusterApiUrl('devnet'),
    );
  }

  async getWalletBalance(address: string) {
    const publicKey = new PublicKey(address);

    const balance = await this.connection.getBalance(publicKey);

    return balance / 1_000_000_000;
  }
}