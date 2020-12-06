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
  unaryCall(request: HeroById, metadata?: Metadata): Observable<Hero>;

  /**
   *  Client Streaming
   */
  clientStreamAsObservable(request: Observable<HeroById>, metadata?: Metadata): Observable<Hero>;

  /**
   *  Server Streaming
   */
  serverStreamAsObservable(request: HeroById, metadata?: Metadata): Observable<Hero>;

  /**
   *  Duplex Streaming
   */
  bidirectionalStreamAsObservable(request: Observable<HeroById>, metadata?: Metadata): Observable<Hero>;

}

export interface HeroServiceController {

  /**
   *  Unary Call
   */
  unaryCall(request: HeroById, metadata?: Metadata): Promise<Hero> | Observable<Hero> | Hero;

  /**
   *  Client Streaming
   */
  clientStreamAsObservable(request: Observable<HeroById>, metadata?: Metadata): Promise<Hero> | Observable<Hero> | Hero;

  /**
   *  Server Streaming
   */
  serverStreamAsObservable(request: HeroById, metadata?: Metadata): Observable<Hero>;

  /**
   *  Duplex Streaming
   */
  bidirectionalStreamAsObservable(request: Observable<HeroById>, metadata?: Metadata): Observable<Hero>;

}

export function HeroServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['unaryCall', 'serverStreamAsObservable'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('HeroService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ['clientStreamAsObservable', 'bidirectionalStreamAsObservable'];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('HeroService', method)(constructor.prototype[method], method, descriptor);
    }
  }
}

export const protobufPackage = 'hero'

export const HERO_PACKAGE_NAME = 'hero'
export const HERO_SERVICE_NAME = 'HeroService';