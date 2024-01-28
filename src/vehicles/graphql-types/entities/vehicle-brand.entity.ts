import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VehicleModel } from './vehicle-model.entity';
import { BrandDto } from '../../dtos/brand.dto';
import { plainToInstance } from 'class-transformer';
import { ExplicitInheritMaxAge } from '../../../common/directives/explicit-inherit-max-age.directive';

@ObjectType()
export class VehicleBrand {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly name: string;

  @ExplicitInheritMaxAge()
  @Field(() => [VehicleModel])
  readonly models: VehicleModel[];

  static mapToEntity(data: BrandDto): VehicleBrand {
    return plainToInstance(VehicleBrand, {
      id: String(data.id),
      name: data.name,
      models: VehicleModel.mapToEntities(data.models),
    } as VehicleBrand);
  }

  static mapToEntities(data: BrandDto[]): VehicleBrand[] {
    return data.map((brand) => VehicleBrand.mapToEntity(brand));
  }
}
