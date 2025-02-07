export interface WaterProductType {
  id: string;
  name: string;
  quantity: number;
  description: string;
  unit: string;
  price: number;
  isAvailable: boolean;
  createdAt: string;
}

export interface WaterProductCreationAttributes
  extends Omit<WaterProductType, 'id' | 'createdAt'> {}
