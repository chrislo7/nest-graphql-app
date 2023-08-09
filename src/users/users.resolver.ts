import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(of => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(returns => [User])
  getUsers(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Query(returns => User)
  getUser(@Args('id', {type: () => Int}) id: number): Promise<User> {
    return this.usersService.findOne(id)
  }

  @Mutation(returns => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.usersService.createUser(createUserInput)
  }
} 
