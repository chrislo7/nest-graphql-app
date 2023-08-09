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
    return this.productRepository.save(newProduct) // insert into db
  }

  async bulkCreate(
    createProductInput: CreateProductInput[],
  ): Promise<Product[]> {
    const products = this.productRepository.create(createProductInput);
    return await this.productRepository.save(products);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOneOrFail({ where: { id } })
  }

  updateProduct(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
