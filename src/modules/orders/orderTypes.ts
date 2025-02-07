export interface OrderTypes {
  id: string;
  userId: string;
  driverId: string;
  items: OrderItemProductType[];
  status?: OrderStatus;
  totalAmount: number;
  deliveryAddress: string;
  deliveryDate: string;
  createdAt: string;
}
export enum OrderStatus {
  PENDING = 'pending',
  FAILED = 'failed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface OrderItemProductType {
  productId: string;
  quantity: number;
}

export interface OrderItemsTypes {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unit_price: number;
}

export interface OrderTypesCreationAttributes
  extends Omit<OrderTypes, 'id' | 'driverId' | 'createdAt'> {}
[];
