import {
  Column,
  Model,
  Table,
  DataType,
  Unique,
  IsEmail,
  AllowNull,
  Length,
  Default,
  PrimaryKey,
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { UserAttributes, UserCreationAttributes } from '../userTypes';
import { Orders } from 'src/modules/orders/model/orders.model';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  readonly id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  firstName: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  lastName: string;

  @AllowNull(false)
  @Unique
  @IsEmail
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Length({ min: 6, max: 24 })
  @Column(DataType.STRING)
  password: string;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    if (instance.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      instance.password = await bcrypt.hash(instance.password, salt);
    }
  }

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.STRING)
  phoneNo?: string;

  @Column(DataType.STRING)
  address?: string;

  @Column(DataType.STRING)
  city?: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  state?: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  country?: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  zip?: number;

  @AllowNull(false)
  @Default('user')
  @Column(DataType.ENUM('user', 'driver', 'moderator', 'admin', 'superadmin'))
  role: 'user' | 'driver' | 'moderator' | 'admin' | 'superadmin';

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  isFlagged: boolean;

  @AllowNull(true)
  @Column(DataType.STRING)
  profileImageUrl: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  emailVerificationToken: string; // for login after signup and password reset

  @Default(false)
  @Column(DataType.BOOLEAN)
  isEmailVerified: boolean;

  @HasMany(() => Orders)
  orders: Orders[];
}
