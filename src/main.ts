import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_LOGGER_TOKEN } from 'src/constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 验证DTO数据
  // app.useLogger(app.get(WINSTON_LOGGER_TOKEN));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
