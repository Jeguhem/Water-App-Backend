import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductRepository } from './products.repository';
import { Water_products } from './models/waterProduct.model';
import { DatabaseModule } from 'src/config/database/database.modules';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductRepository,
    { provide: 'WATER_PRODUCT_MODEL', useValue: Water_products },
  ],
  exports: [ProductsService, ProductRepository],
})
export class ProductsModule {}
