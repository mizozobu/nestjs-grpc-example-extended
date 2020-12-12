import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:5000',
    package: ['hero', 'villan'],
    protoPath: [
      join(__dirname, './hero/hero.proto'),
      join(__dirname, './villan/villan.proto'),
    ],
  },
};
