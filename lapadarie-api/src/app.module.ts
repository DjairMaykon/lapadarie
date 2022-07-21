import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [PrismaModule, OrderModule, ProductModule],
})
export class AppModule {}
