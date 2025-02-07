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
  tableName: 'water_products',
  timestamps: true,
})
export class Water_products extends Model<WaterProductType> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(6),
    defaultValue: () => {
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let result = '';
      for (let i = 0; i < 6; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
      return result;
    },
  })
  readonly id: string;

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
}
