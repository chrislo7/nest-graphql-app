import { Field, Float, InputType, Int } from "@nestjs/graphql"
import { IsNumber } from "class-validator";

@InputType()
export class CreateProductInput {
  @Field()
  name: string

  @IsNumber()
  @Field(() => Float)
  price: number;
}