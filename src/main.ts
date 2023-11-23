import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Options, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = ['http://localhost:3000']
  app.enableCors({
    origin: corsOptions
  })
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }))
  await app.listen(3333);
}
bootstrap();
