import { IsBoolean, IsInt, IsOptional, MinLength } from 'class-validator';

export class CreateOrderDto {
  @MinLength(2, {
    message: 'O nome do cliente deve ter no minimo 2 caracteres',
  })
  client: string;
  @IsInt({
    message: 'A quantidade de pães deve ser um número inteiro',
  })
  amount: number;
  @IsBoolean()
  @IsOptional()
  delivered?: boolean;
}
