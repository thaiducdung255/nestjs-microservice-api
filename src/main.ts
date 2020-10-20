import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

  const options = new DocumentBuilder()
    .setTitle('Sample nest microservice')
    .setDescription('An microservice API implemented by NestJS and Swagger')
    .setVersion('1.1')
    .addTag('User')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  await app.useGlobalPipes(new ValidationPipe({
    forbidUnknownValues: true,
  }))

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
