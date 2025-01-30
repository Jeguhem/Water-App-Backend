export interface UserAttributes {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNo?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: number;
  role?: 'user' | 'driver' | 'moderator' | 'admin' | 'superadmin';
}

export interface UserCreationAttributes
  extends Omit<UserAttributes, 'id' | 'createdAt'> {}
