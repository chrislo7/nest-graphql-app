import { Field, InputType, Int } from "@nestjs/graphql"
import { IsAlpha, IsEmail, Max, Min } from "class-validator"

@InputType()
export class CreateUserInput {
  @IsAlpha()
  @Field()
  name: string

  @IsEmail()
  @Field()
  email: string

  @Min(0)
  @Max(120)
  @Field(type => Int)
  age: number

  @Field({ nullable: true })
  order?: string
}