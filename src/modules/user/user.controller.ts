import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreationAttributes } from './userTypes';
import { ResponseService } from 'src/shared/response/response.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseService: ResponseService,
  ) {}

  @Get('/')
  public async getUsers() {
    return this.userService.getUsers();
  }

  @Patch('/update/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() params: UserCreationAttributes,
  ) {
    try {
      const findUser = await this.userService.findUserById(id);
      if (!findUser) {
        return this.responseService.buildErrorResponse(404, 'User not found');
      }
      const updatedUser = await this.userService.updateUser(id, params);
      // return updatedUser;
      return this.responseService.buildSuccessResponse(
        updatedUser,
        `updated user ${id} successfully updated`,
      );
    } catch (err) {
      return this.responseService.buildErrorResponse(err.message, '500');
    }
  }
}
