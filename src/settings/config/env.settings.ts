import * as Joi from 'joi';

export interface EnvSettings {
  readonly NODE_ENV: Joi.StringSchema<string>;
  readonly PORT: Joi.NumberSchema<number>;
  readonly REDIS_HOST: Joi.StringSchema<string>;
  readonly REDIS_PASSWORD: Joi.StringSchema<string>;
  readonly REDIS_PORT: Joi.NumberSchema<number>;
}

export const envSettings: EnvSettings = {
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PASSWORD: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
};
