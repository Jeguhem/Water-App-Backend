import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DatabaseModule } from 'src/config/database/database.modules';
import { OrderRepository } from './orders.repository';
import { Orders } from './model/orders.model';
import { OrderItems } from './model/order-items.models';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [DatabaseModule, ProductsModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrderRepository,
    { provide: 'ORDERS', useValue: Orders },
    { provide: 'ORDER_ITEMS', useValue: OrderItems },
  ],
  exports: [OrdersService, OrderRepository],
})
export class OrdersModule {}
