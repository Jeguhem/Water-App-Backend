import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ResponseService } from 'src/shared/response/response.service';
import { OrderStatus, OrderTypesCreationAttributes } from './orderTypes';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private reponseService: ResponseService,
  ) {}

  @Get('/')
  async getAllOrders() {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() params: OrderTypesCreationAttributes) {
    const orderDetails = params;
    const order = await this.ordersService.createOrder(orderDetails);

    return {
      message: 'Order created successfully',
      order,
    };
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getOrderById(id: string) {
    const order = await this.ordersService.getOrderById(id);
    return this.reponseService.buildSuccessResponse(order);
  }

  @Patch('/:id/cancel')
  @UseGuards(JwtAuthGuard)
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() params: OrderStatus,
  ) {
    const updateOrderStatus = await this.ordersService.updateOrderStatus(
      id,
      params,
    );
    return this.reponseService.buildSuccessResponse(updateOrderStatus);
  }

  @Get('/order-items/:orderId')
  @UseGuards(JwtAuthGuard) // Protect route
  async getOrderItems(@Param('orderId') orderId: string) {
    return await this.ordersService.getOrderItems(orderId);
  }
}
