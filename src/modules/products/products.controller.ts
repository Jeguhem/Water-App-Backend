import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get('/:id')
  public async findProductById(@Param('id') id: string) {
    return this.productService.findProductById(id);
  }
}
