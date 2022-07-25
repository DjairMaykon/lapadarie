import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Inventory, InventoryHistory, Product } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

interface InventoryWithAllRelationships extends Omit<Inventory, 'productId'> {
  history: InventoryHistory[];
  product: Product;
}
interface HistoryWithInventory extends InventoryHistory {
  inventory: Inventory;
}
@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  findInventory(productId: number): Promise<Inventory> {
    return this.prisma.inventory.findUnique({
      where: {
        productId: productId,
      },
    });
  }

  async create(
    createInventoryDto: CreateInventoryDto,
  ): Promise<InventoryHistory> {
    let inventory = await this.findInventory(createInventoryDto.productId);
    if (!inventory)
      await this.prisma.inventory.create({
        data: {
          productId: createInventoryDto.productId,
        },
      });
    inventory = await this.findInventory(createInventoryDto.productId);
    await this.prisma.inventory.update({
      data: {
        amount: inventory.amount + createInventoryDto.amount,
      },
      where: {
        id: inventory.id,
      },
    });
    return await this.prisma.inventoryHistory.create({
      data: {
        entryAmount: createInventoryDto.amount,
        inventoryId: inventory.id,
      },
    });
  }

  findStock(): Promise<Omit<Inventory, 'productId'>[]> {
    return this.prisma.inventory.findMany({
      select: {
        productId: false,
        product: true,
        id: true,
        amount: true,
        createdAt: true,
        history: false,
      },
    });
  }

  findAll(): Promise<InventoryWithAllRelationships[]> {
    return this.prisma.inventory.findMany({
      select: {
        productId: false,
        product: true,
        id: true,
        amount: true,
        createdAt: true,
        history: true,
      },
    });
  }

  async findByProduct(
    productId: number,
  ): Promise<Omit<Inventory, 'productId'>> {
    const inventory = await this.prisma.inventory.findUnique({
      select: {
        productId: false,
        product: true,
        id: true,
        amount: true,
        createdAt: true,
        history: true,
      },
      where: { productId },
    });
    if (!inventory)
      throw new HttpException(
        'Produto não encontrado no estoque',
        HttpStatus.NOT_FOUND,
      );
    return inventory;
  }

  async findOneHistory(historyId: number): Promise<HistoryWithInventory> {
    const history = await this.prisma.inventoryHistory.findUnique({
      include: { inventory: true },
      where: { id: historyId },
    });
    if (!history)
      throw new HttpException(
        'Registro de entrada no inventario não encontrado',
        HttpStatus.NOT_FOUND,
      );
    return history;
  }

  async update(historyId: number, updateInventoryDto: UpdateInventoryDto) {
    const history = await this.findOneHistory(historyId);
    await this.prisma.inventory.update({
      data: {
        amount:
          history.inventory.amount -
          history.entryAmount +
          updateInventoryDto.entryAmount,
      },
      where: {
        id: history.inventoryId,
      },
    });
    return this.prisma.inventoryHistory.update({
      data: updateInventoryDto,
      where: {
        id: historyId,
      },
    });
  }

  async remove(productId: number): Promise<Inventory> {
    const inventory = await this.findByProduct(productId);
    return this.prisma.inventory.delete({
      where: { id: inventory.id },
    });
  }
}
