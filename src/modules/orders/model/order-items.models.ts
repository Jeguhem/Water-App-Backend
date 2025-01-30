import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { Orders } from './orders.model';
import { Water_products } from 'src/modules/products/models/waterProduct.model';

@Table({
  tableName: 'order_items',
  timestamps: true,
})
export class OrderItems extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => Orders)
  @Column(DataType.UUID)
  orderId: string;

  @ForeignKey(() => Water_products)
  @Column(DataType.UUID)
  productId: string;

  @Column(DataType.INTEGER)
  quantity: number;

  @Column(DataType.DECIMAL(10, 2))
  unitPrice: number;

  @BelongsTo(() => Orders)
  order: Orders;

  @BelongsTo(() => Water_products)
  product: Water_products;
}
