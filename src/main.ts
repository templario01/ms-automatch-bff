import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get<number>('PORT');
  const logger = new Logger('Bootstrap');

  await app.listen(port, '0.0.0.0', () => {
    logger.log(`Server running on port: ${port} 🚀 ✨✨`);
  });
}
bootstrap();
