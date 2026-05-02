import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional, Min } from 'class-validator';

export class CreateWaterProductDto {
  @ApiProperty({
    description: 'Water product name',
    example: 'Pure Water 50cl',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Available quantity in stock',
    example: 100,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty({
    description: 'Product description',
    example: 'Premium purified drinking water in 50cl bottles',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Unit of measurement',
    example: 'bottles',
  })
  @IsString()
  unit: string;

  @ApiProperty({
    description: 'Price per unit in Naira',
    example: 50,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({
    description: 'Product availability status',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}

// For updates - all fields optional except what you want to enforce
export class UpdateWaterProductDto {
  @ApiPropertyOptional({
    description: 'Water product name',
    example: 'Pure Water 50cl',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Available quantity in stock',
    example: 100,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity?: number;

  @ApiPropertyOptional({
    description: 'Product description',
    example: 'Premium purified drinking water in 50cl bottles',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Unit of measurement',
    example: 'bottles',
  })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiPropertyOptional({
    description: 'Price per unit in Naira',
    example: 50,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({
    description: 'Product availability status',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}
