import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Orders } from './model/orders.model';
import {
  OrderItemProductType,
  OrderTypesCreationAttributes,
} from './orderTypes';
import { OrderItems } from './model/order-items.models';

@Injectable()
export class OrderRepository {
  constructor(
    @Inject('SEQUELIZE') private sequelize: Sequelize,
    @Inject('ORDERS') private order: typeof Orders,
    @Inject('ORDER_ITEMS') private orderItems: typeof OrderItems,
  ) {}

  async createOrder(order: OrderTypesCreationAttributes): Promise<Orders> {
    const newOrder = await this.order.create(order);
    return newOrder;
  }

  async createOrderItem(orderId: string, item: OrderItemProductType) {
    const orderObject = { ...item, orderId };
    const orderItem = await this.orderItems.create(orderObject);
    return orderItem;
  }

  async getAllOrderById(id: number) {
    const order = await this.order.findAndCountAll({ where: { id: id } });
    return {
      count: order.count,
      order: order.rows[0],
    };
  }
}
