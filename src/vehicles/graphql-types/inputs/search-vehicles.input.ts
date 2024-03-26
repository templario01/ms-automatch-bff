import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { CursorPaginatorInput } from './cursor-paginator.input';
import { Field, InputType } from '@nestjs/graphql';
import { VehicleCondition } from '../../dtos/enum/vehicle-condition.enum';

@InputType()
export class SearchVehiclesInput extends CursorPaginatorInput {
  @Field()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly brand?: string;

  @Field()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly model?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly location?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly minPrice?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly maxPrice?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly year?: number;

  @Field(() => VehicleCondition, { nullable: true })
  @IsOptional()
  @IsEnum(VehicleCondition, { message: 'Please set "NEW" or "USED"' })
  readonly condition?: VehicleCondition;
}
