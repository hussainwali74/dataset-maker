import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
const fs = require('fs');

import * as basicAuth from 'express-basic-auth';


async function bootstrap() {
  // how to generate private keys for https:
  // https://www.youtube.com/watch?v=USrMdBF0zcg
  const httpsOptions = {
    key: fs.readFileSync('./secrets/key.pem'),
    cert: fs.readFileSync('./secrets/cert.pem')

  }
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  }); //for live server: comment out when deploying

  //const app = await NestFactory.create<NestExpressApplication>(AppModule); //for local 

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('ds_maker example')
    .setDescription('The ds_maker API description')
    .setVersion('1.0')
    .addTag('ds_maker')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'bearer', in: 'header' },
      'token')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const swaggerOptions = {
    swaggerOption: {
      persistAuthorization: true,
    },
    customSiteTitle: "dataset maker"

  };
  // app.use(
  //   ['/docs', '/docs-json'],
  //   basicAuth({
  //     challenge: true,
  //     users: {
  //       "hussainadmin@dsmaker.com": 'hussainadmin',
  //     },
  //   }),
  // );
  SwaggerModule.setup('docs', app, document, swaggerOptions);

  app.use('/', express.static('../uploads'));

  await app.listen(5000);
}
bootstrap();
