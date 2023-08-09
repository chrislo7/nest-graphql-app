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
  
  // change this to @OneToMany after products is implemented
  @Column({nullable: true})
  @Field({nullable: true})
  order?: string // list of products
}