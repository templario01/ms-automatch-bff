import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Brand {
  @Field()
  readonly name: string;
}
