import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { AddProductsToUserOrderInput } from './dto/add-product-to-user-order.input';

@Resolver(of => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  // get a list of users
  @Query(returns => [User])
  getUsers(): Promise<User[]> {
    return this.usersService.findAll()
  }

  // get a single user
  @Query(returns => User)
  getUser(@Args('id', {type: () => Int}) id: number): Promise<User> {
    return this.usersService.findOne(id)
  }

  // create a single user
  @Mutation(returns => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.usersService.createUser(createUserInput)
  }

  // update a single user by ID
  @Mutation(returns => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput): Promise<User> {
    return this.usersService.updateUser(updateUserInput)
  }

  // remove a single user by ID 
  @Mutation(() => String)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.removeUser(id);
  }

  // add products to a user's order list.
  @Mutation(() => User)
  async addProductsToUserOrder(
    @Args('addProductsToUserOrderInput') addProductsToUserOrderInput: AddProductsToUserOrderInput,
  ): Promise<User> {
    return this.usersService.addProductsToUserOrder(addProductsToUserOrderInput);
  }
} 
