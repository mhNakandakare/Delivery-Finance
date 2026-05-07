import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateStabDto } from './dto/create-stab.dto';
import { StabsService } from './stab.service';

@Controller('stabs')
export class stabsController {
  constructor(
    private readonly stabsService: StabsService,
  ) {}

  @Post()
  create(@Body() dto: CreateStabDto) {
    return this.stabsService.create(
      'mock-owner-id',
      dto,
    );
  }

  @Get()
  findAll() {
    return this.stabsService.findAll();
  }
}