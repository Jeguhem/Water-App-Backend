import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserCreationAttributes } from './userTypes';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers() {
    return await this.userRepository.getAllUsers();
  }

  async createUser(userData: UserCreationAttributes) {
    try {
      const user = await this.userRepository.createUser(userData);
      const { password: _, ...result } = user.get({ plain: true });
      return result;
    } catch (error) {
      console.error('error creating user', error);
      throw new ConflictException('Error creating user');
    }
  }

  async findUserById(userId: string) {
    return await this.userRepository.findUserById(userId);
  }

  async updateUser(id: string, userData: UserCreationAttributes) {
    try {
      const user = await this.userRepository.updateUser(id, userData);
      return user;
    } catch (error) {
      console.error('error updating user', error);
      throw new ConflictException('Error updating user', error);
    }
  }
}
