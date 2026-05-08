import { IsNumber, IsUUID, Min } from 'class-validator';

export class InvestDto {
  @IsUUID()
  fundingPoolId!: string;

  @IsNumber()
  @Min(1)
  amount!: number;
}