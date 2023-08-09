import { Field, InputType, Int } from "@nestjs/graphql"

@InputType()
export class CreateProductInput {
  @Field()
  name: string

  @Field(type => Int)
  price: number
}