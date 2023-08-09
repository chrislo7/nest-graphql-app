import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AddProductsToUserOrderInput {
  @Field(() => ID)
  id: number;

  @Field(() => [ID])
  order: number[];
}