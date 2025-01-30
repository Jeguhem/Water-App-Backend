import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CartTypes } from '../cartTypes';

@Table({
  tableName: 'cart',
  timestamps: true,
})
export class Cart extends Model<CartTypes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  readonly id: string;
}
