import { registerEnumType } from '@nestjs/graphql';

export enum VehicleCondition {
  NEW = 'NEW',
  USED = 'USED',
}

registerEnumType(VehicleCondition, {
  name: 'VehicleCondition',
  description: 'vehicle condition',
});
