import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateProductInput } from "./dto/create-product.input";
import { Product } from "./entities/product.entity";
import { ProductsService } from "./products.service";
import { ProductsResolver } from "./products.resolver";

describe('ProductsService', () => {
  let productsService: ProductsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Product]),
      ],
      providers: [ProductsService, ProductsResolver],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const product: CreateProductInput = { name: 'apple', price: 4.11 };
      const createdProduct = await productsService.create(product);
      expect(createdProduct).toMatchObject({id: 1, ...product})
    });
  })

  describe('bulkCreate', () => {
    it('should create a list of new products', async () => {
      const products: CreateProductInput[] = [
        { name: 'apple', price: 4.11 },
        { name: 'orange', price: 1.23 },
      ];
  
      const createdProducts = await productsService.bulkCreate(products);
      expect(createdProducts).toHaveLength(2)
      expect(createdProducts[0]).toMatchObject({id: 1, ...products[0]})
      expect(createdProducts[1]).toMatchObject({id: 2, ...products[1]})
    });
  })

  describe('updateProduct', () => {
    it('should update a product', async () => {
      const product: CreateProductInput = { name: 'apple', price: 4.11 };
      const createdProduct = await productsService.create(product);
      const updatedFields = {
        id: 1,
        name: 'broccoli',
      }
      const updatedProduct = await productsService.updateProduct(updatedFields)
      expect(updatedProduct).toMatchObject({ ...createdProduct, ...updatedFields })
    })
  })

  describe('removeProduct', () => {
    beforeEach(async () => {
      const product: CreateProductInput = { name: 'apple', price: 4.11 };
      await productsService.create(product);
    })

    it('should remove a product', async () => {
      const results = await productsService.removeProduct(1)
      expect(results).toMatch('Product with ID=1 successfully deleted.')
    })

    it('should fail to remove a product when provided an incorrect id', async () => {
      const results = await productsService.removeProduct(999)
      expect(results).toMatch('Failed to delete product with ID=999.')
    })
  })
});