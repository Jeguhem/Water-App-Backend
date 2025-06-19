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
  role?: 'user' | 'driver' | 'moderator' | 'admin' | 'superadmin';
}

export type UserCreationAttributes = Omit<UserAttributes, 'id' | 'createdAt'>;
