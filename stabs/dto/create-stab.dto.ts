import { IsNumber, IsString } from 'class-validator';

export class CreateStabDto {
  @IsString()
  name!: string;

  @IsString()
  cnpj!: string;

  @IsNumber()
  monthlyRevenue!: number;

  @IsString()
  description!: string;
}