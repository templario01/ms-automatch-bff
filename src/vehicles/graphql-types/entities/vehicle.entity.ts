import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { VehicleCondition } from '../../dtos/enum/vehicle-condition.enum';
import { InventoryStatus } from '../../dtos/enum/inventory-status.enum';
import { PriceCurrency } from '../../dtos/enum/price-currency.enum';
import { VehicleDto } from '../../dtos/vehicle.dto';
import { plainToInstance } from 'class-transformer';

@ObjectType()
export class VehicleEntity {
  @Field()
  readonly id: string;

  @Field()
  readonly externalId: string;

  @Field()
  readonly url: string;

  @Field()
  readonly name: string;

  @Field({ nullable: true })
  readonly description?: string;

  @Field()
  readonly year: number;

  @Field({ nullable: true })
  readonly transmission?: string;

  @Field()
  readonly mileage: number;

  @Field({ nullable: true })
  readonly frontImage?: string;

  @Field({ nullable: true })
  readonly images?: string;

  @Field()
  readonly location: string;

  @Field(() => VehicleCondition)
  readonly condition: VehicleCondition;

  @Field()
  readonly originalPrice: number;

  @Field()
  readonly price: number;

  @Field(() => PriceCurrency)
  readonly currency: PriceCurrency;

  @Field(() => GraphQLISODateTime, { nullable: true })
  readonly createdAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  readonly updatedAt: Date;

  @Field()
  readonly websiteId: string;

  @Field(() => InventoryStatus)
  readonly status: InventoryStatus;

  static mapToEntity(data: VehicleDto): VehicleEntity {
    return plainToInstance(VehicleEntity, {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      currency: PriceCurrency[data.currency],
      condition: VehicleCondition[data.condition],
      status: InventoryStatus[data.status],
    } as VehicleEntity);
  }

  static mapToEntities(data: VehicleDto[]): VehicleEntity[] {
    return data.map((vehicle) => VehicleEntity.mapToEntity(vehicle));
  }
}
