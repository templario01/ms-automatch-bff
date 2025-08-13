import { registerEnumType } from '@nestjs/graphql';

export enum InventoryStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

registerEnumType(InventoryStatus, {
  name: 'InventoryStatus',
  description: 'Inventory current status',
});
