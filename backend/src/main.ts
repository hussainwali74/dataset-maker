import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('ds_maker example')
    .setDescription('The ds_maker API description')
    .setVersion('1.0')
    .addTag('ds_maker')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'bearer' },
      'token')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const swaggerOptions = {
    swaggerOption: {
      persistAuthorization: true,
    },
    customSiteTitle: "dataset maker"

  };
  SwaggerModule.setup('docs', app, document, swaggerOptions);

  app.use('/', express.static('../uploads'));

  await app.listen(5000);
}
bootstrap();
