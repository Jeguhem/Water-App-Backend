import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SignupParams } from './authTypes';
import { AuthService } from './auth.service';
import { UserCreationAttributes } from '../user/userTypes';
import { UserService } from '../user/user.service';
import { ResponseService } from 'src/shared/response/response.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private responseService: ResponseService,
  ) {}

  @Post('/login')
  async login(@Body() params: SignupParams) {
    const { email, password } = params;
    try {
      const loginResponse = await this.authService.login(email, password);
      return this.responseService.buildResponse(
        201,
        'Login succesful',
        loginResponse,
      );
    } catch (error) {
      return this.responseService.buildResponse(500, 'failed to login ', error);
    }
  }

  @Post('/register-user')
  async createUserAccount(@Body() params: UserCreationAttributes) {
    const userData = params;
    try {
      await this.userService.createUser(userData);
      return this.responseService.buildResponse(201, 'User created');
    } catch (error) {
      console.error('error creating user', error);
      return this.responseService.buildResponse(500, 'Error creating user');
    }
  }
}
