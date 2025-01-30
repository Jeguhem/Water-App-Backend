import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { WaterProductType } from '../productsTypes';
import { OrderItems } from 'src/modules/orders/model/order-items.models';

@Table({
  tableName: 'water-products',
  timestamps: true,
})
export class Water_products extends Model<WaterProductType> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  readonly id: string;

  @ForeignKey(() => OrderItems)
  @Column(DataType.UUID)
  orderId: string;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.DECIMAL)
  quantity: number;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.STRING)
  unit: string;

  @Column(DataType.DECIMAL)
  price: number;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isAvailable: boolean;

  @BelongsTo(() => OrderItems)
  orderItems: OrderItems;
}
