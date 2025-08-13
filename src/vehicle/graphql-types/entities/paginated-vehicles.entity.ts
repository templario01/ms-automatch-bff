import { Field, ObjectType } from '@nestjs/graphql';
import { VehicleEntity } from './vehicle.entity';
import { Paginated, VehicleDto } from '../../dtos/vehicle.dto';
import { plainToInstance } from 'class-transformer';
import { ExplicitInheritMaxAge } from '../../../common/directives/explicit-inherit-max-age.directive';

@ObjectType()
export class VehicleEdgeEntity {
  @Field()
  readonly cursor: string;

  @ExplicitInheritMaxAge()
  @Field(() => VehicleEntity)
  readonly node: VehicleEntity;
}

@ObjectType()
export class PaginatedVehiclesEntity {
  @ExplicitInheritMaxAge()
  @Field(() => [VehicleEdgeEntity])
  readonly edges: VehicleEdgeEntity[];

  @ExplicitInheritMaxAge()
  @Field(() => [VehicleEntity])
  readonly nodes: VehicleEntity[];

  @Field()
  readonly totalCount: number;

  @Field()
  readonly hasNextPage: boolean;

  @Field({ nullable: true })
  readonly endCursor?: string;

  static mapToEntity(data: Paginated<VehicleDto>): PaginatedVehiclesEntity {
    return plainToInstance(PaginatedVehiclesEntity, {
      endCursor: data.endCursor,
      totalCount: data.totalCount,
      hasNextPage: data.hasNextPage,
      nodes: VehicleEntity.mapToEntities(data.nodes),
      edges: data.edges.map((edge) => {
        return plainToInstance(VehicleEdgeEntity, {
          node: VehicleEntity.mapToEntity(edge.node),
          cursor: edge.cursor,
        });
      }),
    } as PaginatedVehiclesEntity);
  }
}
