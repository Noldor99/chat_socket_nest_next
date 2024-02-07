import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import * as cookieParser from 'cookie-parser'

async function start() {
  const PORT = process.env.PORT || 4000

  const app = await NestFactory.create(AppModule, { cors: false });
  app.setGlobalPrefix('api')


  const configService = app.get(ConfigService)
  const COOKIE_SECRET = configService.get('COOKIE_SECRET') || 'default'
  app.use(cookieParser(COOKIE_SECRET))

  app.enableCors({ credentials: true, origin: true });
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Cloud storage')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  try {
    await app.listen(PORT, () =>
      console.log(`Server started on port = ${PORT}`),
    )
  } catch (error) {
    console.log('Error starting the server:', error)
  }
}
start();
