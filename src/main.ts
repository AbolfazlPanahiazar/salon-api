import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtGuard } from './modules/auth/classes/jwt.guard';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configService } from './core/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const jwtAuthGuard = app.get(JwtGuard);

  app.useGlobalGuards(jwtAuthGuard);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const options = new DocumentBuilder()
    .setTitle('Stage Api Endpoints')
    .setDescription('Salon Api Endpoints description')
    .setVersion('1')
    .setExternalDoc('Postman Collection', '/api-json')
    .addBearerAuth({
      type: 'http',
      in: 'api',
      name: 'Authorization',
      bearerFormat: 'jwt',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    ...configService.getExtraModels(),
  });
  SwaggerModule.setup('/api', app, document);

  const { host, port } = configService.getHostAndPort();

  await app.listen(Number(port) || 3002, host, () => {
    console.log(`Nest application started on %s:%s`, host, port);
  });
}
bootstrap();
