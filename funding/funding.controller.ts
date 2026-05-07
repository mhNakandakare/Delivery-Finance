import { Body, Controller, Get, Post } from '@nestjs/common';
import { FundingService } from './funding.service';
import { CreatePoolDto } from './dto/create-pool.dto';

@Controller('funding')
export class FundingController {
  constructor(private readonly fundingService: FundingService) {}

  @Post('pool')
  createPool(@Body() dto: CreatePoolDto) {
    return this.fundingService.createPool(dto);
  }

  @Get('pools')
  getPools() {
    return this.fundingService.getPools();
  }
}