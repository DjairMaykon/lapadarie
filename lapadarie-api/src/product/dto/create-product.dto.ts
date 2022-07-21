import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2, {
    message: 'A descrição do produto deve ter no minimo 2 caracteres',
  })
  description: string;
  @IsNumber()
  price: number;
}
