import { User } from '../user/models/user.model';

export interface SignupParams {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phoneNo?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: number;
}

export interface SignInResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  userData: UserData;
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl?: string;
}
