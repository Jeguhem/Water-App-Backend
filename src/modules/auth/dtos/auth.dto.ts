import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;

  @ApiProperty({ example: '1234567890' })
  phoneNo?: string;

  @ApiProperty({ example: '123 Main St' })
  address?: string;

  @ApiProperty({ example: 'Bronx' })
  city?: string;

  @ApiProperty({ example: 'New York' })
  state?: string;

  @ApiProperty({ example: 'United state' })
  country?: string;

  @ApiProperty()
  zip?: number;
}

export class LoginDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;
}

export interface SignInResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  userData: UserDataDto;
}


export class UserDataDto {
  @ApiProperty({
    example: '64c8e1e5fa2c2b001f3e9d14',
    description: 'Unique identifier for the user',
  })
  id: string;

  @ApiProperty({ example: 'John', description: 'First name of the user' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  lastName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the user',
  })
  email: string;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    required: false,
    description: "Optional URL to the user's profile image",
  })
  profileImageUrl?: string;
}

