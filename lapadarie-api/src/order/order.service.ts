import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  create(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.prisma.order.create({
      data: {
        client: createOrderDto.client,
        amount: createOrderDto.amount,
      },
    });
  }

  findAll(): Promise<Order[]> {
    return this.prisma.order.findMany();
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

  async remove(id: number): Promise<Order> {
    await this.findOne(id);
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
