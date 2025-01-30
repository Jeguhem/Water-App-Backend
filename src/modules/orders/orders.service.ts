import { Injectable } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import {
  OrderItemProductType,
  OrderTypesCreationAttributes,
} from './orderTypes';
import { Orders } from './model/orders.model';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(order: OrderTypesCreationAttributes): Promise<Orders> {
    return this.orderRepository.createOrder(order);
  }

  async createOrderItem(orderId: string, item: OrderItemProductType) {
    return this.orderRepository.createOrderItem(orderId, item);
  }

  async getAllOrdersById(orderId: number) {
    return this.orderRepository.getAllOrderById(orderId);
  }
}
