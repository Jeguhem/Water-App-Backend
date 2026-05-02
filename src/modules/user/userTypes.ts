export interface UserAttributes {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNo?: string;
  address?: string;
  lga?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: number;
  role?: UserRole;
}

export type UserCreationAttributes = Omit<UserAttributes, 'id' | 'createdAt'>;

export enum UserRole {
  USER = 'user',
  DRIVER = 'driver',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}
