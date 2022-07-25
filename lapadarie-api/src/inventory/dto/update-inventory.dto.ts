import { IsInt } from 'class-validator';

export class UpdateInventoryDto {
  @IsInt()
  entryAmount: number;
}
