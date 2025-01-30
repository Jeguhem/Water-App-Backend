export interface OrderTypes {
  id: string;
  userId: string;
  driverId: string;
  items: OrderItemProductType[];
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  totalAmount: number;
  orderDate: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryDate: string;
  createdAt: string;
}

export interface OrderItemProductType {
  productId: string;
  quantity: number;
  price: number;
}

export interface OrderItemsTypes {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unit_price: number;
}

export interface OrderTypesCreationAttributes
  extends Omit<OrderTypes, 'id' | 'createdAt'> {}
[];
