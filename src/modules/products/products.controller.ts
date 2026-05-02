import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { WaterProductCreationAttributes } from './productsTypes';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @ApiOperation({ summary: 'get all available product' })
  @Get('/')
  public async getProduct() {
    return this.productService.getProduct();
  }

  @ApiOperation({ summary: 'create water product' })
  @Post('/create-water')
  public async createProduct(@Body() params: WaterProductCreationAttributes) {
    return this.productService.createWaterProduct(params);
  }

  @ApiOperation({ summary: 'get product by id' })
  @Get('/:id')
  public async findProductById(@Param('id') id: string) {
    return this.productService.findProductById(id);
  }
}
