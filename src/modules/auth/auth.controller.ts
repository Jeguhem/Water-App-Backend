import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { UserCreationAttributes } from '../user/userTypes';
import { UserService } from '../user/user.service';
import { ResponseService } from 'src/shared/response/response.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private responseService: ResponseService,
  ) {}

  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginDto })
  @Post('/login')
  async login(@Body() params: LoginDto):Promise<any> {
    const { email, password } = params;
    try {
      const loginResponse = await this.authService.login(email, password);
      return this.responseService.buildResponse(
        201,
        'Login successful',
        loginResponse,
      );
    } catch (error) {
      return this.responseService.buildResponse(500, 'failed to login ', error);
    }
  }

  @ApiOperation({ summary: 'Register User' })
  @ApiBody({ type: CreateUserDto })
  @Post('/register-user')
  async createUserAccount(@Body() params: UserCreationAttributes) {
    try {
      await this.userService.createUser(params);
      return this.responseService.buildResponse(201, 'User created');
    } catch (error) {
      console.error('error creating user', error);
      return this.responseService.buildResponse(500, 'Error creating user');
    }
  }
}
