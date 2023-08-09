import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ProductsModule } from 'src/products/products.module';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product]), ProductsModule],
  providers: [UsersService, UsersResolver]
})
export class UsersModule {}
