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

  async login(
    email: string,
    password: string,
    res?: Response,
  ): Promise<SignInResponse> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException(`User ${email} does not exist`);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(`Invalid password`);
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    const userData: UserData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
    };

    // res.cookie('accessToken', accessToken, {
    //   // httpOnly: false, // Prevent client-side access to the cookie
    //   secure: true, // Use HTTPS to transmit the cookie
    //   sameSite: 'strict', // Prevent CSRF attacks
    //   maxAge: 24 * 60 * 60 * 1000, // 24 hours
    // });

    return {
      message: 'login successfull',
      accessToken,
      userData,
    };
  }

  async register(userData: UserCreationAttributes) {
    try {
      const user = await this.userRepository.createUser(userData);
      const { password: _, ...result } = user.get({ plain: true });
      return result;
    } catch (error) {
      console.error('error creating user', error);
      throw new ConflictException('Error creating user');
    }
  }
}
