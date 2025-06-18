import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonLoggerService } from './logger/winston-logger.service';
import { LoggingInterceptor } from './logger/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new WinstonLoggerService(),
  });
  app.enableCors({
    origin: 'http://localhost:3000', // ReactなどのフロントエンドのURL
    credentials: true, // Cookieや認証情報を許可する場合
  });

  const logger = new WinstonLoggerService();
  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  await app.listen(3001);
}
void bootstrap();
