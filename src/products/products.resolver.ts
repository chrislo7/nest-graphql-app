import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product, { description: 'Creates a single product'})
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productsService.create(createProductInput);
  }

  @Mutation(() => [Product], { description: 'Creates multiple products at once' })
  createMultipleProducts(
    @Args('bulkCreateInput', { type: () => [CreateProductInput] })
    bulkCreateInput: CreateProductInput[],
  ) {
    return this.productsService.bulkCreate(bulkCreateInput);
  }

  @Query(() => [Product], { description: 'Gets all products' })
  getProducts() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { description: 'Gets a single product by id'})
  getProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product, { description: 'Updates a single product by id' })
  updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return this.productsService.updateProduct(updateProductInput);
  }

  @Mutation(() => String, { description: 'Removes a single product by id'})
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.removeProduct(id);
  }
}
