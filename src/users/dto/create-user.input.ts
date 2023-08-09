import { Field, InputType, Int } from "@nestjs/graphql"

@InputType()
export class CreateUserInput {
  @Field()
  name: string

  @Field()
  email: string

  @Field(type => Int)
  age: number

  @Field({ nullable: true })
  order?: string
}