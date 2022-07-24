import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Order, OrderItem } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  create(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.prisma.order.create({
      data: {
        client: createOrderDto.client,
        canceled: createOrderDto.canceled ?? false,
        delivered: createOrderDto.delivered ?? false,
      },
    });
  }

  addItem(orderId: number, createItemDto: CreateItemDto): Promise<OrderItem> {
    return this.prisma.orderItem.create({
      data: {
        amount: createItemDto.amount,
        orderId: orderId,
        productId: createItemDto.productId,
      },
    });
  }

  async addItems(
    orderId: number,
    createItemDtos: CreateItemDto[],
  ): Promise<OrderItem[]> {
    const items: OrderItem[] = [];
    for (const createItemDto of createItemDtos) {
      const item = await this.addItem(orderId, createItemDto);
      items.push(item);
    }
    return items;
  }

  findAll(): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: { orderItem: true },
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });
    if (!order)
      throw new HttpException('Pedido não encontrado', HttpStatus.NOT_FOUND);
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.findOne(id);
    return this.prisma.order.update({
      data: updateOrderDto,
      where: {
        id,
      },
    });
  }

  async findOneItem(orderId: number, productId: number): Promise<OrderItem> {
    const orderItem = await this.prisma.orderItem.findUnique({
      where: {
        orderId_productId: {
          orderId,
          productId,
        },
      },
    });
    if (!orderItem)
      throw new HttpException('Item não encontrado', HttpStatus.NOT_FOUND);
    return orderItem;
  }

  async updateItem(
    orderId: number,
    productId: number,
    updateOrderDto: UpdateItemDto,
  ) {
    await this.findOneItem(orderId, productId);
    return this.prisma.orderItem.update({
      data: updateOrderDto,
      where: {
        orderId_productId: { orderId, productId },
      },
    });
  }

  async remove(id: number): Promise<Order> {
    await this.findOne(id);
    return this.prisma.order.delete({
      where: { id },
    });
  }

  async removeItem(orderId: number, productId: number): Promise<OrderItem> {
    await this.findOneItem(orderId, productId);
    return this.prisma.orderItem.delete({
      where: { orderId_productId: { orderId, productId } },
    });
  }
}
