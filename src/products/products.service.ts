import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

  create(createProductInput: CreateProductInput) {
    const newProduct = this.productRepository.create(createProductInput)
    return this.productRepository.save(newProduct)
  }

  async bulkCreate(
    bulkCreateInput: CreateProductInput[],
  ): Promise<Product[]> {
    const products = this.productRepository.create(bulkCreateInput);
    return await this.productRepository.save(products);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOneOrFail({ where: { id } })
  }

  async updateProduct(updateProductInput: UpdateProductInput) {
    const product = await this.productRepository.findOneOrFail({ where: { id: updateProductInput.id } });
    return this.productRepository.save({...product, ...updateProductInput});
  }

  async removeProduct(id: number): Promise<string> {
    const deletedProduct = await this.productRepository.delete(id);

    if (deletedProduct.affected) {
      return `Product with ID=${id} successfully deleted.`
    } else {
      return `Failed to delete product with ID=${id}.`
    }
  }
}
