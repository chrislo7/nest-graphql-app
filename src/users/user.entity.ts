import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  name: string;
  
  @Column()
  @Field()
  email: string;

  @Column()
  @Field(type => Int)
  age: number;
  
  @ManyToMany(() => Product, { cascade: true })
  @JoinTable()
  @Field(() => [Product], { defaultValue: [] })
  order: Product[];

  addProductsToOrder(products: Product[]) {
    if (!this.order) {
      this.order = []
    }
    this.order.push(...products);
  }
}