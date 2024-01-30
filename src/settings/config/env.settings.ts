import * as Joi from 'joi';

export interface EnvSettings {
  readonly NODE_ENV: Joi.StringSchema<string>;
  readonly PORT: Joi.NumberSchema<number>;
  readonly REDIS_URL: Joi.StringSchema<string>;
  readonly INVENTORY_API_URL: Joi.StringSchema<string>;
}

export const envSettings: EnvSettings = {
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string().required(),
  REDIS_URL: Joi.string().required(),
  INVENTORY_API_URL: Joi.string().required(),
};
