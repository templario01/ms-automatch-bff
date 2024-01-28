import { Field, ObjectType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

@ObjectType()
export class VehicleModel {
  @Field()
  readonly name: string;

  static mapToEntity(model: string): VehicleModel {
    return plainToInstance(VehicleModel, {
      name: model,
    } as VehicleModel);
  }

  static mapToEntities(models: string[]): VehicleModel[] {
    return models.map((model) => VehicleModel.mapToEntity(model));
  }
}
