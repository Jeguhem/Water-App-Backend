import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { WaterProductCreationAttributes } from './productsTypes';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get('/')
  public async getProduct() {
    return this.productService.getProduct();
  }

  @Post('/create-water')
  public async createProduct(@Body() params: WaterProductCreationAttributes) {
    const waterProduct = params;
    return this.productService.createWaterProduct(waterProduct);
  }
}
