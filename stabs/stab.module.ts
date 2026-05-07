import { Module } from '@nestjs/common';
import { stabsController } from './stab.controller';
import { StabsService } from './stab.service';

@Module({
  controllers: [stabsController],
  providers: [StabsService],
})
export class StabsModule {}