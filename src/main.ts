import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const port = app.get(ConfigService).get<number>('PORT');
  const logger = new Logger('Bootstrap');

  await app.listen(port, (_err, address) => {
    logger.log(`Server running on port: ${port} 🚀 ✨✨`);
    logger.log(`GraphQL URL: ${address}/graphql`);
  });
}
bootstrap();
