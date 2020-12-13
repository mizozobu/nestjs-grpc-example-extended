# NestJS gRPC Example Extended

## Getting Started

```sh
git clone https://github.com/mizozobu/nestjs-grpc-example-extended.git
cd nestjs-grpc-example-extended
yarn
```

## Usage

### Launch Server

```sh
yarn start:dev
```

### Send Requests

#### Unary Call
```sh
grpcurl -plaintext \
-proto ./src/hero/hero.proto \
-import-path ./src/hero \
-d @ localhost:5000 hero.HeroService/UnaryCall <<EOM
{
  "id": 1
}
EOM
```

```sh
// response
{
  "id": 1,
  "name": "John"
}
```

#### Client Streaming
```sh
grpcurl -plaintext \
-proto ./src/hero/hero.proto \
-import-path ./src/hero \
-d @ localhost:5000 hero.HeroService/ClientStreamAsObservable
```

```sh
// payload
{
  "id": 1
}
```

#### Server Streaming
```sh:
grpcurl -plaintext \
-proto ./src/hero/hero.proto \
-import-path ./src/hero \
-d @ localhost:5000 hero.HeroService/ServerStreamAsObservable <<EOM
{
  "id": 1
}
EOM
```

```sh
// response 1
{
  "id": 1,
  "name": "John"
}

// response 2
{
  "id": 2,
  "name": "Doe"
}
```

#### Bidirectional Streaming
```sh
grpcurl -plaintext \
-proto ./src/hero/hero.proto \
-import-path ./src/hero \
-d @ localhost:5000 hero.HeroService/BidirectionalStreamAsObservable
```

```sh
// payload
{
  "id": 1
}

// response
{
  "id": 1,
  "name": "John"
}
```

### E2E Test
```sh
yarn test:e2e
```
