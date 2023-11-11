import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { json as expressJson, urlencoded as expressUrlEncoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: cors.CorsOptions = {
    origin: ['http://localhost:5173', 'https://hola2.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);

  app.use(expressJson({ limit: '50mb' }));
  app.use(expressUrlEncoded({ limit: '50mb', extended: true }));
  
  // await app.listen(parseInt(process.env.PORT));
  await app.listen(8000);
}
bootstrap();
