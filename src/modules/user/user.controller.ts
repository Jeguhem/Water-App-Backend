import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreationAttributes } from './userTypes';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/user.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @Get('/')
  public async getUsers() {
    try {
      return this.userService.getUsers();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiBody({ type: CreateUserDto })
  @Patch('/update/:id')
  public async updateUser(@Param('id') id: string, @Body() params: UserCreationAttributes) {
    const findUser = await this.userService.findUserById(id);
    if (!findUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return await this.userService.updateUser(id, params);
  }
}
