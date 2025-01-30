import { Injectable } from '@nestjs/common';
import { ProductRepository } from './products.repository';
import { WaterProductCreationAttributes } from './productsTypes';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProduct() {
    return this.productRepository.getAllWaterProduct();
  }

  async createWaterProduct(waterProduct: WaterProductCreationAttributes) {
    return this.productRepository.createWaterProduct(waterProduct);
  }
}
