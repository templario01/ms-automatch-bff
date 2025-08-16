import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@ArgsType()
export class GetBrandsArgs {
  @Field(() => String)
  @IsString()
  @Length(2, 25)
  @IsNotEmpty()
  readonly word: string;
}
