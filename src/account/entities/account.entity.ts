import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VehicleEntity } from 'src/vehicles/graphql-types/entities/vehicle.entity';

@ObjectType('Account')
export class AccountEntity {
  @Field(() => ID)
  id: string;

  @Field(() => Boolean)
  hasActiveNotifications: boolean;

  @Field(() => [VehicleEntity], { nullable: true })
  favoriteVehicles?: VehicleEntity[];
}
