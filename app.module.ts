import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StabsModule } from './stabs/stab.module';
import { FundingModule } from './funding/funding.module';
import { BlockchainModule } from './blockchain/blockchain.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    DatabaseModule,
    AuthModule,
    UsersModule,
    StabsModule,
    FundingModule,
    BlockchainModule,
  ],
})
export class AppModule {}