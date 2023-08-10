import { TestingModule, Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateProductInput } from "src/products/dto/create-product.input";
import { AddProductsToUserOrderInput } from "./dto/add-product-to-user-order.input";
import { CreateUserInput } from "./dto/create-user.input";
import { Product } from "src/products/entities/product.entity";
import { ProductsService } from "src/products/products.service";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";
import { User } from "./user.entity";

describe('UsersService', () => {
  let usersService: UsersService;
  let productsService: ProductsService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User, Product],
          synchronize: true,
        }),

        TypeOrmModule.forFeature([User, Product]),
      ],
      providers: [
        UsersService,
        UsersResolver,
        ProductsService,
      ],
    }).compile();
    usersService = module.get<UsersService>(UsersService);
    productsService = module.get<ProductsService>(ProductsService);
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const user: CreateUserInput = {
        name: 'bob',
        email: 'bob@bob.com',
        age: 27,
      };
      const createdUser = await usersService.createUser(user);
      expect(createdUser).toMatchObject({ id: 1, ...user })
    });
  }) 

  describe('updateUser', () => {
    it('should update a user', async () => {
      const user: CreateUserInput = {
        name: 'bob',
        email: 'bob@bob.com',
        age: 27,
      };

      const updatedFields = {
        id: 1,
        name: 'john',
        email: 'john@john.com'
      }

      const createdUser = await usersService.createUser(user);
      const updatedUser = await usersService.updateUser(updatedFields)
      expect(updatedUser).toMatchObject({ 
        ...createdUser,
        ...updatedFields,
      })
    });
  }) 

  describe('removeUser', () => {
    beforeEach(async () => {
      const user: CreateUserInput = { name: 'bob', email: 'bob@bob.com', age: 28 };
      await usersService.createUser(user);
    })

    it('should remove a user', async () => {
      const results = await usersService.removeUser(1)
      expect(results).toMatch('User with ID=1 successfully deleted.')
    })

    it('should fail to remove a user when provided an incorrect id', async () => {
      const results = await usersService.removeUser(999)
      expect(results).toMatch('Failed to delete user with ID=999.')
    })
  })

  describe('addProductsToUserOrder', () => {
    it('should add products ', async () => {
      const user: CreateUserInput = {
        name: 'bob',
        email: 'bob@bob.com',
        age: 27,
      };
      const createdUser = await usersService.createUser(user);

      const apple: CreateProductInput = {
        name: 'apple',
        price: 4.11,
      };  
      const product = await productsService.create(apple)

      const addProducts: AddProductsToUserOrderInput = {
        id: createdUser.id,
        order: [product.id],
      };
  
      const result = await usersService.addProductsToUserOrder(addProducts);
      expect(result.order).toHaveLength(1)
      expect(result.order[0]).toMatchObject(product)
    });
  }) 
});