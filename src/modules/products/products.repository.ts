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
    const waterProducts = await this.water_product.findAndCountAll();
    return {
      count: waterProducts.count,
      data: waterProducts.rows,
    };
  }

  async createWaterProduct(
    waterProduct: WaterProductCreationAttributes,
  ): Promise<Water_products> {
    return await this.water_product.create(waterProduct);
  }

  async findProductById(id: string) {
    try {
      const product = await this.water_product.findByPk(id);

      if (!product) {
        console.log(`Product with ID ${id} not found.`);
        return null;
      }

      return product;
    } catch (error) {
      console.error(`Error finding product with ID ${id}:`, error);
      throw error; // Re-throw the error if you want to handle it elsewhere
    }
  }

  //find products by an array if ids
  async findProductsById(productIds: string[]) {
    const allProductsFound = await this.water_product.findAndCountAll({
      where: { id: productIds },
    });
    return {
      count: allProductsFound.count,
      data: allProductsFound.rows,
    };
  }
}
