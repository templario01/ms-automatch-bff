import { Directive } from '@nestjs/graphql';

export const ExplicitInheritMaxAge = () =>
  Directive('@cacheControl(inheritMaxAge: true)');
