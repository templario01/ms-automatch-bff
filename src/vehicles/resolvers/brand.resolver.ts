/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Info, Query } from '@nestjs/graphql';
import { Brand } from '../graphql-types/brand.entity';
import { CacheControl } from '../../common/decorators/cahche-control';

@Injectable()
export class Brands {
  @Query(() => Brand)
  @CacheControl('PUBLIC', 300)
  getBrands(@Info() _info?): Brand {
    return { name: 'toyota' };
  }
}
