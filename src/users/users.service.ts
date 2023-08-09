import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Product } from 'src/products/entities/product.entity';
import { AddProductsToUserOrderInput } from './dto/add-product-to-user-order.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {}

  createUser(createUserInput:CreateUserInput): Promise<User> {
    const newUser = this.userRepository.create(createUserInput)
    return this.userRepository.save(newUser);
  }

  async updateUser(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: { id },
      relations: [ 'order' ]
    });
    return this.userRepository.save({...user, ...updateUserInput});
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['order'] });
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneOrFail({ 
      where: { id },
      relations: ['order']
    })
  }

  async removeUser(id: number): Promise<string> {
    const deletedUser = await this.userRepository.delete(id);

    if (deletedUser.affected) {
      return `User with ID=${id} successfully deleted.`
    } else {
      return `Failed to delete user with ID=${id}.`
    }
  }

  async addProductsToUserOrder(
    addProductToUserOrderInput: AddProductsToUserOrderInput,
  ): Promise<User> {
    const { id, order } = addProductToUserOrderInput;

    const user = await this.userRepository.findOneOrFail({
      where: { id },
      relations: ['order'],
    });

    const products = await this.productRepository.find({ 
      where: { id: In(order) }
    });

    user.addProductsToOrder(products);
    return this.userRepository.save(user);
  }
}
