import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // ReactなどのフロントエンドのURL
    credentials: true, // Cookieや認証情報を許可する場合
  });
  await app.listen(3001);
}
void bootstrap();
