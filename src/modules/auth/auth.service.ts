import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { SignInResponse, UserData } from './authTypes';
import { UserCreationAttributes } from '../user/userTypes';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<SignInResponse> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException(`User ${email} does not exist`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Generate Access Token (Short-lived)
    const accessToken = await this.jwtService.signAsync(
      { sub: user.id, email: user.email },
      { secret: process.env.JWT_SECRET, expiresIn: '15m' }, // 15 minutes
    );

    // Generate Refresh Token (Long-lived)
    const refreshToken = await this.jwtService.signAsync(
      { sub: user.id },
      { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: '7d' }, // 7 days
    );

    return {
      message: 'Login successful',
      accessToken,
      refreshToken, // Send this back to client
      userData: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
      },
    };
  }

  async register(userData: UserCreationAttributes): Promise<SignInResponse> {
    try {
      const user = await this.userRepository.createUser(userData);
      const { password: _, ...result } = user.get({ plain: true });

      // Generate Access Token (Short-lived)
      const accessToken = await this.jwtService.signAsync(
        { sub: user.id, email: user.email },
        { secret: process.env.JWT_SECRET, expiresIn: '15m' }, // 15 minutes
      );

      // Generate Refresh Token (Long-lived)
      const refreshToken = await this.jwtService.signAsync(
        { sub: user.id },
        { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: '7d' }, // 7 days
      );

      return {
        message: 'User registered successfully',
        accessToken,
        refreshToken, // Send this back to client
        userData: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          profileImageUrl: user.profileImageUrl,
        },
      };
    } catch (error) {
      console.error('Error creating user', error);
      throw new ConflictException('Error creating user');
    }
  }
}
