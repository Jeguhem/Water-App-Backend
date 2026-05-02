import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { UserCreationAttributes } from '../user/userTypes';
import { UserService } from '../user/user.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dtos/user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginDto })
  @Post('/login')
  async login(@Body() params: LoginDto): Promise<any> {
    const { email, password } = params;
    try {
      const loginResponse = await this.authService.login(email, password);
      return {
        status: 201,
        message: 'Login successful',
        data: loginResponse,
      };
    } catch (error) {
      return { status: 500, message: 'failed to login ', data: error };
    }
  }

  @ApiOperation({ summary: 'Register User' })
  @ApiBody({ type: CreateUserDto })
  @Post('/register-user')
  async createUserAccount(@Body() params: UserCreationAttributes) {
    try {
      await this.userService.createUser(params);
      return 'User created';
    } catch (error) {
      console.error('error creating user', error);
      return 'Error creating user';
    }
  }
}
