import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory, InventoryHistory } from '@prisma/client';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  create(
    @Body() createInventoryDto: CreateInventoryDto,
  ): Promise<InventoryHistory> {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get('stock')
  findStock(): Promise<Omit<Inventory, 'productId'>[]> {
    return this.inventoryService.findStock();
  }

  @Get()
  findAll(): Promise<Omit<Inventory, 'productId'>[]> {
    return this.inventoryService.findAll();
  }

  @Get(':productId')
  findByProduct(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<Omit<Inventory, 'productId'>> {
    return this.inventoryService.findByProduct(productId);
  }

  @Patch(':historyId')
  update(
    @Param('historyId', ParseIntPipe) historyId: number,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.inventoryService.update(+historyId, updateInventoryDto);
  }

  @Delete(':productId')
  remove(@Param('productId', ParseIntPipe) productId: number) {
    return this.inventoryService.remove(+productId);
  }
}
