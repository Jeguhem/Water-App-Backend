import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsNumber, MinLength, IsIn, IsEnum } from 'class-validator';
import { UserRole } from '../userTypes';

export class CreateUserDto {
  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'SecurePassword123!',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({
    description: 'User phone number',
    example: '+2348012345678',
  })
  @IsOptional()
  @IsString()
  phoneNo?: string;

  @ApiPropertyOptional({
    description: 'User address',
    example: '15 Victoria Island Lagos',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    description: 'Local Government Area',
    example: 'Lagos Island',
  })
  @IsOptional()
  @IsString()
  lga?: string;

  @ApiPropertyOptional({
    description: 'City',
    example: 'Lagos',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    description: 'State',
    example: 'Lagos State',
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({
    description: 'Country',
    example: 'Nigeria',
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({
    description: 'ZIP/Postal code',
    example: 100001,
  })
  @IsOptional()
  @IsNumber()
  zip?: number;

  @ApiPropertyOptional({
    description: 'User role',
    enum: UserRole,
    example: UserRole.USER,
    default: UserRole.USER,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
