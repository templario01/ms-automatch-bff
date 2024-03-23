import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

@InputType()
export class CursorPaginatorInput {
  @Field({ nullable: true, defaultValue: 36 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly take?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly after?: string;
}
