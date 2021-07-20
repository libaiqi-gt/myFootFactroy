import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('美食工厂后端api')
    .setDescription('美食工厂毕设项目')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  // 解决CORS跨域问题
  const corsOptions = {
    origin(origin, callback) {
      callback(null, true);
    },
    credentials: true
  };
  app.enableCors(corsOptions);

  await app.listen(3000);
}
bootstrap();
