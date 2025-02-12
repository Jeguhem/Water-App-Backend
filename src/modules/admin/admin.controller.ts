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
  async getOrders(
    @Query('status') status?: OrderStatus,
    @Query('date') date?: Date,
  ) {
    return this.orderService.getAllOrders(status, date);
  }

  @Get('/pending-orders')
  async getAllPendingOrders() {
    return this.orderService.getAllPendingOrders();
  }

  @Get('/revenue-metrics')
  async getRevenueMetrics(
    @Query('range') range?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.orderService.getRevenueMetrics();
  }

  @Get('/orders-by-location')
  async getOrdersByLocation(@Query('city') city: string) {
    // return this.orderService.getOrdersByLocation(location);
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
