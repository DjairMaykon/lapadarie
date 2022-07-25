import { IsInt } from 'class-validator';

export class CreateInventoryDto {
  @IsInt()
  productId: number;
  @IsInt()
  amount: number;
}
