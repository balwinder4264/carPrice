import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true
    })
    // whitelist => is to remove parameter from requet those are not requred
  );
  await app.listen(3000);
}
bootstrap();
