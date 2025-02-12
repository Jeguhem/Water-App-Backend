import { Injectable } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import {
  OrderItemProductType,
  OrderStatus,
  OrderTypesCreationAttributes,
} from './orderTypes';
import { ProductRepository } from '../products/products.repository';
import { Op } from 'sequelize';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async createOrder(orderDetails: OrderTypesCreationAttributes) {
    const productIds = orderDetails.items.map((item) => item.productId);

    // Fetch all products at once (batch query for efficiency)
    const { count, data: products } =
      await this.productRepository.findProductsById(productIds);

    // Ensure all requested products exist
    if (count !== productIds.length) {
      throw new Error('One or more products do not exist');
    }

    // Map products to a dictionary for easy lookup
    const productMap = new Map(
      products.map((product) => [product.id, product.price]),
    );

    // Attach unit prices & calculate totalAmount
    let totalAmount = 0;
    const orderItems = orderDetails.items.map((item) => {
      const unitPrice = productMap.get(item.productId) || 0;
      totalAmount += unitPrice * item.quantity; // Update total amount
      return {
        ...item,
        unit_price: unitPrice,
      };
    });

    // Create the order with calculated total amount
    const order = await this.orderRepository.createOrder({
      ...orderDetails,
      status: OrderStatus.PENDING,
      totalAmount, // Overwrite totalAmount with calculated value
    });

    // Store order items
    for (const item of orderItems) {
      console.log('Order Item before saving:', { orderId: order.id, ...item });

      await this.createOrderItem(order.id, {
        ...item,
      });
    }

    return order;
  }

  async createOrderItem(
    orderId: string,
    item: OrderItemProductType & { unit_price: number }, // Already formatted item
  ) {
    return await this.orderRepository.createOrderItem(orderId, item);
  }

  async getAllOrders(status?: OrderStatus, date?: Date) {
    let whereClause: any = {};

    // Add status filter if provided
    if (status) {
      whereClause.status = status;
    }

    // Add date filter if provided
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      whereClause.createdAt = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }

    try {
      const orders = await this.orderRepository.getAllOrders(whereClause);
      return orders;
    } catch (error) {
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }
  }

  async getAllOrdersByUserId(userId: string) {
    return this.orderRepository.getAllOrdersByUserId(userId);
  }

  async getOrderById(orderId: string) {
    return this.orderRepository.getOrderById(orderId);
  }

  async getAllPendingOrders() {
    return this.orderRepository.getAllPendingOrders();
  }

  async updateOrderStatus(orderId: string, status: OrderStatus) {
    return this.orderRepository.updateOrderStatus(orderId, status);
  }

  async assignOrderToDriver(orderId: string, driverId: string) {
    return this.orderRepository.assignOrderToDriver(orderId, driverId);
  }

  async getOrderItems(orderId: string) {
    return await this.orderRepository.findOrderItemsByOrderId(orderId);
  }

  async getRevenueMetrics(
    range?: string,
    startDate?: string,
    endDate?: string,
  ) {
    let whereClause: any = {};
    const now = new Date();

    if (range) {
      const cleanRange = range.toLowerCase().replace(/_/g, ''); // Normalize input

      switch (cleanRange) {
        case 'today':
          const startOfDay = new Date();
          startOfDay.setHours(0, 0, 0, 0);
          whereClause.createdAt = { [Op.between]: [startOfDay, now] };
          break;

        case 'thisweek':
          const startOfWeek = new Date();
          startOfWeek.setDate(now.getDate() - now.getDay());
          startOfWeek.setHours(0, 0, 0, 0);
          whereClause.createdAt = { [Op.between]: [startOfWeek, now] };
          break;

        case 'thismonth':
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          whereClause.createdAt = { [Op.between]: [startOfMonth, now] };
          break;

        case 'thisyear':
          const startOfYear = new Date(now.getFullYear(), 0, 1);
          whereClause.createdAt = { [Op.between]: [startOfYear, now] };
          break;

        case 'last7days':
          whereClause.createdAt = {
            [Op.gte]: new Date(now.setDate(now.getDate() - 7)),
          };
          break;

        case 'last30days':
          whereClause.createdAt = {
            [Op.gte]: new Date(now.setDate(now.getDate() - 30)),
          };
          break;

        case 'last6months':
          whereClause.createdAt = {
            [Op.gte]: new Date(now.setMonth(now.getMonth() - 6)),
          };
          break;

        case 'lastyear':
          whereClause.createdAt = {
            [Op.gte]: new Date(now.setFullYear(now.getFullYear() - 1)),
          };
          break;
      }
    } else if (startDate && endDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);

      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      whereClause.createdAt = { [Op.between]: [start, end] };
    }

    return this.orderRepository.getMetrics(whereClause);
  }
}
