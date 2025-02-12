import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Orders } from './model/orders.model';
import {
  OrderItemProductType,
  OrderStatus,
  OrderTypesCreationAttributes,
} from './orderTypes';
import { OrderItems } from './model/order-items.models';
import { stat } from 'fs';
import { Op } from 'sequelize';

@Injectable()
export class OrderRepository {
  constructor(
    @Inject('SEQUELIZE') private sequelize: Sequelize,
    @Inject('ORDERS') private order: typeof Orders,
    @Inject('ORDER_ITEMS') private orderItems: typeof OrderItems,
  ) {}

  async createOrder(order: OrderTypesCreationAttributes): Promise<Orders> {
    return await this.order.create(order);
  }

  async createOrderItem(
    orderId: string,
    item: OrderItemProductType & { unit_price: number },
  ) {
    return await this.orderItems.create({
      orderId,
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: Number(item.unit_price), // Use `unitPrice` instead of `unit_price`
    });
  }
  async getAllOrders(whereClause = {}) {
    const allOrders = await this.order.findAndCountAll({ where: whereClause });
    return {
      count: allOrders.count,
      orders: allOrders.rows,
    };
  }

  async getAllOrdersByUserId(userId: string) {
    const order = await this.order.findAndCountAll({
      where: { userId: userId },
    });
    return {
      count: order.count,
      order: order.rows[0],
    };
  }

  async getOrderById(orderId: string) {
    return await this.order.findByPk(orderId);
  }

  async getAllPendingOrders() {
    const orders = await this.order.findAndCountAll({
      where: { status: 'pending' },
    });
    return {
      count: orders.count,
      orders: orders.rows,
    };
  }

  async updateOrderStatus(orderId: string, status: OrderStatus) {
    await this.order.update({ status: status }, { where: { id: orderId } });
    return {
      message: 'Order status updated',
      status: 201,
    };
  }

  async assignOrderToDriver(orderId: string, driverId: string) {
    await this.order.update({ driverId: driverId }, { where: { id: orderId } });
    return {
      message: 'Order assigned to driver',
      status: 201,
    };
  }

  async findOrderItemsByOrderId(orderId: string) {
    return await this.orderItems.findAll({ where: { orderId } });
  }

  async getMetrics(
    whereClause = {},
  ): Promise<{ totalRevenue: number; totalOrders: number }> {
    try {
      const result = (await this.order.findAll({
        where: (whereClause = {
          ...whereClause,
          status: { [Op.notIn]: ['canceled', 'refunded'] }, // Exclude canceled/refunded orders
        }),
        attributes: [
          [
            this.sequelize.fn('SUM', this.sequelize.col('totalAmount')),
            'totalRevenue',
          ],
          [this.sequelize.fn('COUNT', this.sequelize.col('id')), 'totalOrders'],
        ],
        raw: true,
      })) as unknown as { totalRevenue: string; totalOrders: string }[];

      return {
        totalRevenue: Number(result[0]?.totalRevenue) || 0,
        totalOrders: Number(result[0]?.totalOrders) || 0,
      };
    } catch (error) {
      throw new Error(`Failed to fetch metrics: ${error.message}`);
    }
  }
}
