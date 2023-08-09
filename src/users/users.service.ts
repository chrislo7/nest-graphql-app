import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  createUser(createUserInput:CreateUserInput): Promise<User> {
    const newUser = this.userRepository.create(createUserInput)
    return this.userRepository.save(newUser) // insert into db
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find(); // SELECT * FROM users
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneOrFail({ where: { id } })
  }
}
