import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  async findAll(): Promise<User[]> {
    const user = new User;
    user.id = 1
    user.name = 'chris'
    user.age = 27
    user.email = 'test@test.com'
    user.order = ['testing']

    return [user]
  }
}
