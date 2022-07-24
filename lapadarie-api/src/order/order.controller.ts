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
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderItem } from '@prisma/client';
import { OrderService } from './order.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Post(':orderId/item')
  addItem(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() createItemDto: CreateItemDto,
  ): Promise<OrderItem> {
    return this.orderService.addItem(orderId, createItemDto);
  }

  @Post(':orderId/items')
  addItems(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() createItemDtos: CreateItemDto[],
  ): Promise<OrderItem[]> {
    return this.orderService.addItems(orderId, createItemDtos);
  }

  @Get()
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Patch(':orderId/item/:productId')
  updateItem(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Param('productId', ParseIntPipe) productId: number,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.orderService.updateItem(+orderId, +productId, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.remove(+id);
  }

  @Delete(':orderId/item/:productId')
  removeItem(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.orderService.removeItem(+orderId, +productId);
  }
}
