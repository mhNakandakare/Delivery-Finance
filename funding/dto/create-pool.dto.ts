import { IsInt, IsNumber, IsUUID } from 'class-validator';

export class CreatePoolDto {
  @IsUUID()
  stabId!: string;

  @IsNumber()
  targetAmount!: number;

  @IsNumber()
  revenueSharePercentage!: number;

  @IsInt()
  durationMonths!: number;
}