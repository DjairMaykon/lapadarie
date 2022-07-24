import { IsInt } from 'class-validator';

export class CreateItemDto {
  @IsInt()
  productId: number;
  @IsInt()
  amount: number;
}
