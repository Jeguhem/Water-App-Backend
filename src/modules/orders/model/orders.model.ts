// import {
//   AllowNull,
//   Column,
//   DataType,
//   Default,
//   ForeignKey,
//   Model,
//   PrimaryKey,
//   Table,
// } from 'sequelize-typescript';
// import { User } from 'src/modules/user/models/user.model';
// import { OrderTypes } from '../orderTypes';

// @Table({
//   tableName: 'orders',
//   timestamps: true,
// })
// export class Orders extends Model<OrderTypes> {
//   @PrimaryKey
//   @Default(DataType.UUIDV4)
//   @Column(DataType.UUID)
//   readonly id: string;

//   @ForeignKey(() => User)
//   @Column(DataType.UUID)
//   userId: string;

//   @ForeignKey(() => User)
//   @Column(DataType.UUID)
//   driverId: string;

//   @AllowNull(false)
//   @Default('pending')
//   @Column(
//     DataType.ENUM(
//       'pending',
//       'confirmed',
//       'in-progress',
//       'completed',
//       'cancelled',
//     ),
//   )
//   status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';

//   @AllowNull(false)
//   @Column(DataType.NUMBER)
//   totalAmount: number;

//   @AllowNull(false)
//   @Column(DataType.DATE)
//   orderDate: string;

//   @AllowNull(false)
//   @Column(DataType.STRING)
//   deliveryAddress: string;

//   @AllowNull(false)
//   @Column(DataType.STRING)
//   deliveryCity: string;

//   @AllowNull(false)
//   @Column(DataType.STRING)
//   deliveryState: string;

//   @AllowNull(false)
//   @Column(DataType.STRING)
//   deliveryDate: string;

//   @AllowNull(false)
//   @Default(DataType.NOW)
//   @Column(DataType.DATE)
//   createdAt: string;
// }

import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/modules/user/models/user.model';
import { OrderTypes } from '../orderTypes';

@Table({
  tableName: 'orders',
  timestamps: true, // Automatically handles createdAt and updatedAt
})
export class Orders extends Model<OrderTypes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  readonly id: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  driverId: string;

  @AllowNull(false)
  @Default('pending')
  @Column(
    DataType.ENUM('pending', 'failed', 'in-progress', 'completed', 'cancelled'),
  )
  status: 'pending' | 'failed' | 'in-progress' | 'completed' | 'cancelled';

  @AllowNull(false)
  @Column(DataType.DECIMAL)
  totalAmount: number;

  @AllowNull(false)
  @Column(DataType.DATE)
  orderDate: Date;

  @AllowNull(false)
  @Column(DataType.STRING)
  deliveryAddress: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  deliveryCity: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  deliveryState: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  deliveryDate: Date;

  @BelongsTo(() => User)
  user: User;
}
