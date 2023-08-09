import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;
  
  @Field()
  email: string;

  @Field(type => Int)
  age: number;
  
  @Field(() => [String])
  order: string[] // list of products
}