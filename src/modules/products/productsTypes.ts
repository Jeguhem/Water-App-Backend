export interface WaterProductType {
  id: string;
  name: string;
  quantity: number;
  description: string;
  unit: string;
  price: number;
  orderId: string;
  isAvailable: boolean;
  createdAt: string;
}

export interface WaterProductCreationAttributes
  extends Omit<WaterProductType, 'id' | 'createdAt'> {}
