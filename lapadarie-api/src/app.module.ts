import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, OrderModule],
})
export class AppModule {}
