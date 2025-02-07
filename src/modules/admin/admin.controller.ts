import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { OrdersService } from '../orders/orders.service';
import { OrderStatus } from '../orders/orderTypes';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly orderService: OrdersService,
  ) {}

  @Get('/orders')
  async getOrders(@Query('status') status?: OrderStatus) {
    return this.orderService.getAllOrders(status);
  }

  @Get('/pending-orders')
  async getAllPendingOrders(): Promise<any> {
    return this.orderService.getAllPendingOrders();
  }

  @Patch('/update-order-status/:id')
  async updateOrderStatus(
    @Param('id') orderId: string,
    @Query('status') orderStatus: OrderStatus,
  ) {
    return this.orderService.updateOrderStatus(orderId, orderStatus);
  }

  @Patch('assign-order-to-driver/:id')
  async assignOrderToDriver(
    @Param('id') orderId: string,
    @Body('driverId') driverId: string,
  ) {
    return this.orderService.assignOrderToDriver(orderId, driverId);
  }
}
