import { Inject, Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { UserCreationAttributes } from './userTypes';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('SEQUELIZE') private sequelize: Sequelize,
    @Inject('USER_MODEL') private userModel: typeof User,
  ) {}

  //For Login
  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ where: { email } });
  }

  async getAllUsers() {
    const user = await this.userModel.findAndCountAll();
    return {
      count: user.count,
      users: user.rows,
    };
  }

  async createUser(userData: UserCreationAttributes): Promise<User> {
    return await this.userModel.create(userData);
  }

  async updateUser(id: string, userData: UserCreationAttributes) {
    return await this.userModel.update(userData, { where: { id: id } });
  }

  async findUserById(id: string) {
    return await this.userModel.findByPk(id);
  }
}
