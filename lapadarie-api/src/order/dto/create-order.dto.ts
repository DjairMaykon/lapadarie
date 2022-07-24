import { IsBoolean, IsOptional, MinLength } from 'class-validator';

export class CreateOrderDto {
  @MinLength(2, {
    message: 'O nome do cliente deve ter no minimo 2 caracteres',
  })
  client: string;
  @IsBoolean()
  @IsOptional()
  delivered?: boolean;
  @IsBoolean()
  @IsOptional()
  canceled?: boolean;
}
