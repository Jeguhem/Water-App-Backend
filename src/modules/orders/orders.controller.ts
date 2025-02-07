import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ResponseService } from 'src/shared/response/response.service';
import { OrderStatus, OrderTypesCreationAttributes } from './orderTypes';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private reponseService: ResponseService,
  ) {}

  @Get('/')
  async getAllOrders() {}

  @Post('/create')
  async createOrder(@Body() params: OrderTypesCreationAttributes) {
    const orderDetails = params;
    const order = await this.ordersService.createOrder(orderDetails);

    return {
      message: 'Order created successfully',
      order,
    };
  }
}
