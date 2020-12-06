/* eslint-disable */
import { Metadata } from 'grpc';
import { Observable } from 'rxjs';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';


export interface VillanById {
  id: number;
}

export interface Villan {
  id: number;
  name: string;
}

export interface VillanServiceClient {

  /**
   *  Unary Call
   */
  unaryCall(request: VillanById, metadata?: Metadata): Observable<Villan>;

  /**
   *  Client Streaming
   */
  clientStreamAsObservable(request: Observable<VillanById>, metadata?: Metadata): Observable<Villan>;

  /**
   *  Client Streaming
   */
  clientStreamAsStream(request: Observable<VillanById>, metadata?: Metadata): Observable<Villan>;

  /**
   *  Server Streaming
   */
  serverStreamAsObservable(request: VillanById, metadata?: Metadata): Observable<Villan>;

  /**
   *  Duplex Streaming
   */
  bidirectionalStreamAsObservable(request: Observable<VillanById>, metadata?: Metadata): Observable<Villan>;

  /**
   *  Duplex Streaming
   */
  bidirectionalStreamAsStream(request: Observable<VillanById>, metadata?: Metadata): Observable<Villan>;

}

export interface VillanServiceController {

  /**
   *  Unary Call
   */
  unaryCall(request: VillanById, metadata?: Metadata): Promise<Villan> | Observable<Villan> | Villan;

  /**
   *  Client Streaming
   */
  clientStreamAsObservable(request: Observable<VillanById>, metadata?: Metadata): Promise<Villan> | Observable<Villan> | Villan;

  /**
   *  Client Streaming
   */
  clientStreamAsStream(request: Observable<VillanById>, metadata?: Metadata): Promise<Villan> | Observable<Villan> | Villan;

  /**
   *  Server Streaming
   */
  serverStreamAsObservable(request: VillanById, metadata?: Metadata): Observable<Villan>;

  /**
   *  Duplex Streaming
   */
  bidirectionalStreamAsObservable(request: Observable<VillanById>, metadata?: Metadata): Observable<Villan>;

  /**
   *  Duplex Streaming
   */
  bidirectionalStreamAsStream(request: Observable<VillanById>, metadata?: Metadata): Observable<Villan>;

}

export function VillanServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['unaryCall', 'serverStreamAsObservable'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('VillanService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ['clientStreamAsObservable', 'clientStreamAsStream', 'bidirectionalStreamAsObservable', 'bidirectionalStreamAsStream'];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('VillanService', method)(constructor.prototype[method], method, descriptor);
    }
  }
}

export const protobufPackage = 'villan'

export const VILLAN_PACKAGE_NAME = 'villan'
export const VILLAN_SERVICE_NAME = 'VillanService';