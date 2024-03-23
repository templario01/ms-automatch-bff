import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VehicleModel } from './vehicle-model.entity';
import { BrandDto } from '../../dtos/brand.dto';
import { plainToInstance } from 'class-transformer';
import { ExplicitInheritMaxAge } from '../../../common/directives/explicit-inherit-max-age.directive';

@ObjectType()
export class VehicleBrandEntity {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly name: string;

  @ExplicitInheritMaxAge()
  @Field(() => [VehicleModel])
  readonly models: VehicleModel[];

  static mapToEntity(data: BrandDto): VehicleBrandEntity {
    return plainToInstance(VehicleBrandEntity, {
      id: String(data.id),
      name: data.name,
      models: VehicleModel.mapToEntities(data.models),
    } as VehicleBrandEntity);
  }

  static mapToEntities(data: BrandDto[]): VehicleBrandEntity[] {
    return data.map((brand) => VehicleBrandEntity.mapToEntity(brand));
  }
}
