import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { TokenInfoInterceptor } from './interceptors/token-info.interceptor';
import { config as auth0Config} from "./config/auth0.config";
import { auth } from 'express-openid-connect';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);
  app.use(auth(auth0Config));
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))

  // app.useGlobalInterceptors(new TokenInfoInterceptor());
  await app.listen(3000);
}
bootstrap();
