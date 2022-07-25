import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { OrderModule } from './order/order.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [PrismaModule, OrderModule, ProductModule, InventoryModule],
})
export class AppModule {}
