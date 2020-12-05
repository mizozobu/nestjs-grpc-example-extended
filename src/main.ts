import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { grpcClientOptions } from './grpc-client.options';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, grpcClientOptions);

  await app.listenAsync();
  console.log(`Application is running on: ${grpcClientOptions.options.url || 'localhost:5000'}`);
}

bootstrap();
