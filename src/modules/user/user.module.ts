import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/config/database/database.modules';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { User } from './models/user.model';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    { provide: 'USER_MODEL', useValue: User },
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}
