import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { AddProductsToUserOrderInput } from './dto/add-product-to-user-order.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(returns => [User], { description: 'gets all users'})
  getUsers(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Query(returns => User, { description: 'gets a single user by id'})
  getUser(@Args('id', {type: () => Int}) id: number): Promise<User> {
    return this.usersService.findOne(id)
  }

  @Mutation(returns => User, { description: 'creates a single user'})
  createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.usersService.createUser(createUserInput)
  }

  @Mutation(returns => User, { description: 'updates a single user by id'})
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput): Promise<User> {
    return this.usersService.updateUser(updateUserInput)
  }

  @Mutation(() => String, { description: 'removes a single user by id' })
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.removeUser(id);
  }

  @Mutation(() => User, { description: 'Adds products to a user`s order list'})
  async addProductsToUserOrder(
    @Args('addProductsToUserOrderInput') addProductsToUserOrderInput: AddProductsToUserOrderInput,
  ): Promise<User> {
    return this.usersService.addProductsToUserOrder(addProductsToUserOrderInput);
  }
} 
