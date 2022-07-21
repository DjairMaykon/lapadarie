import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: {
        description: createProductDto.description,
        price: createProductDto.price,
      },
    });
  }

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product)
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    return this.prisma.product.update({
      data: updateProductDto,
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<Product> {
    await this.findOne(id);
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
