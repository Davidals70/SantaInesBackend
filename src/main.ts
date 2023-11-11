import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { json as expressJson, urlencoded as expressUrlEncoded } from 'express';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: cors.CorsOptions = {
    origin: ['http://localhost:5173', 'https://santa-ines-client.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);

  app.use(expressJson({ limit: '50mb' }));
  app.use(expressUrlEncoded({ limit: '50mb', extended: true }));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    // Opciones adicionales como Access-Control-Allow-Methods, Access-Control-Allow-Headers, etc.
    next();
  });


  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist:true,
  //     forbidNonWhitelisted:true
  //   }),
  // )
  
  // await app.listen(parseInt(process.env.PORT));
  await app.listen(8000);
}
bootstrap();
