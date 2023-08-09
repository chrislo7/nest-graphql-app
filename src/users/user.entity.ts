import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  
  // change this to @OneToMany after
  @Column()
  @Field()
  order: string // list of products
}