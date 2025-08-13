import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { VehicleEntity } from 'src/vehicle/graphql-types/entities/vehicle.entity';
import { plainToInstance } from 'class-transformer';
import { AccountDto } from '../../dtos/account.dto';

@ObjectType()
export class AccountEntity {
  @Field(() => ID)
  id: string;

  @Field(() => Boolean)
  hasActiveNotifications: boolean;

  @HideField()
  favoriteVehiclesIds: string[];

  @Field(() => [VehicleEntity], { nullable: true })
  favoriteVehicles?: VehicleEntity[];

  static mapToEntity(data: AccountDto): AccountEntity {
    return plainToInstance(AccountEntity, {
      id: data.id,
      hasActiveNotifications: data.hasActiveNotifications,
      favoriteVehiclesIds: data.favoriteVehicles.map(
        (favoriteVehicle) => favoriteVehicle.vehicleId,
      ),
    } as AccountEntity);
  }
}
