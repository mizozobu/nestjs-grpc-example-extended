/* eslint-disable */
import { Metadata } from 'grpc';
import { Observable } from 'rxjs';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';


export interface HeroById {
  id: number;
}

export interface Hero {
  id: number;
  name: string;
}

export interface HeroServiceClient {

  /**
   *  Unary Call
   */
  findOne(request: HeroById, metadata?: Metadata): Observable<Hero>;

  /**
   *  Client Streaming
   */
  clientStreamExample(request: Observable<HeroById>, metadata?: Metadata): Observable<Hero>;

  /**
   *  Server Streaming
   */
  serverStreamExample(request: HeroById, metadata?: Metadata): Observable<Hero>;

  /**
   *  Duplex Streaming
   */
  bidirectionalStreamExample(request: Observable<HeroById>, metadata?: Metadata): Observable<Hero>;

}

export interface HeroServiceController {

  /**
   *  Unary Call
   */
  findOne(request: HeroById, metadata?: Metadata): Promise<Hero> | Observable<Hero> | Hero;

  /**
   *  Client Streaming
   */
  clientStreamExample(request: Observable<HeroById>, metadata?: Metadata): Promise<Hero> | Observable<Hero> | Hero;

  /**
   *  Server Streaming
   */
  serverStreamExample(request: HeroById, metadata?: Metadata): Observable<Hero>;

  /**
   *  Duplex Streaming
   */
  bidirectionalStreamExample(request: Observable<HeroById>, metadata?: Metadata): Observable<Hero>;

}

export function HeroServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['findOne', 'serverStreamExample'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('HeroService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ['clientStreamExample', 'bidirectionalStreamExample'];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('HeroService', method)(constructor.prototype[method], method, descriptor);
    }
  }
}

export const protobufPackage = 'hero'

export const HERO_PACKAGE_NAME = 'hero'
export const HERO_SERVICE_NAME = 'HeroService';