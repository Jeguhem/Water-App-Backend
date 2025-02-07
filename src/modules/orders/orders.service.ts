import { Injectable } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import {
  OrderItemProductType,
  OrderStatus,
  OrderTypesCreationAttributes,
} from './orderTypes';
import { Orders } from './model/orders.model';
import { ProductRepository } from '../products/products.repository';

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

  async getAllOrders(status?: OrderStatus) {
    const whereClause = status ? { status } : {};
    return this.orderRepository.getAllOrders(whereClause);
  }

  async getAllOrdersByUserId(userId: string) {
    return this.orderRepository.getAllOrdersByUserId(userId);
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
}
