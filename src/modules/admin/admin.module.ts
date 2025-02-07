import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { DatabaseModule } from 'src/config/database/database.modules';
import { OrdersModule } from '../orders/orders.module';
import { UserModule } from '../user/user.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [DatabaseModule, OrdersModule, UserModule, ProductsModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
