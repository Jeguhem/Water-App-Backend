import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Water_products } from './models/waterProduct.model';
import { WaterProductCreationAttributes } from './productsTypes';

@Injectable()
export class ProductRepository {
  constructor(
    @Inject('SEQUELIZE') private sequelize: Sequelize,
    @Inject('WATER_PRODUCT_MODEL') private water_product: typeof Water_products,
  ) {}

  async getAllWaterProduct() {
    return await this.water_product;
  }

  async createWaterProduct(
    waterProduct: WaterProductCreationAttributes,
  ): Promise<Water_products> {
    return await this.water_product.create(waterProduct);
  }
}
