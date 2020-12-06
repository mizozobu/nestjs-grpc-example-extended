import { Controller } from '@nestjs/common';
import { GrpcMethod, GrpcStreamCall, GrpcStreamMethod } from '@nestjs/microservices';
import { ServerDuplexStream, ServerReadableStream } from 'grpc';
import { Observable, Subject } from 'rxjs';
import { Villan, VillanById } from './villan';

@Controller('villan')
export class VillanController {
  private readonly items: Villan[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  @GrpcMethod('VillanService')
  unaryCall(data: VillanById): Villan {
    console.log('VillanService.UnaryCall received %o', data);
    const item = this.items.find(({ id }) => id === data.id);
    console.log('VillanService.UnaryCall responsess %o', item);
    return item;
  }

  @GrpcStreamMethod('VillanService')
  clientStreamAsObservable(data$: Observable<VillanById>): Observable<Villan> {
    const villan$ = new Subject<Villan>();

    const onNext = (villanById: VillanById) => {
      console.log('VillanService.ClientStreamAsObservable received %o', villanById);
      const item = this.items.find(({ id }) => id === villanById.id);
      villan$.next(item);
    };
    const onComplete = () => {
      villan$.complete();
      console.log('VillanService.ClientStreamAsObservable completed');
    }
    data$.subscribe({
      next: onNext,
      error: null,
      complete: onComplete
    });

    return villan$.asObservable();
  };

  @GrpcStreamCall('VillanService')
  clientStreamAsStream(
    stream: ServerReadableStream<VillanById>,
    callback: (err: unknown, res: Villan) => void,
  ): void {
    stream.on('data', (villanById: VillanById) => {
      console.log('VillanService.ClientStreamAsStream received %o', villanById);
    });

    stream.on('end', () => {
      console.log('VillanService.ClientStreamAsStream completed');
      callback(null, null);
    });
  };

  @GrpcMethod('VillanService')
  serverStreamAsObservable(data: VillanById): Observable<Villan> {
    const subject = new Subject<Villan>();
    console.log('VillanService.ServerStreamAsObservable received %o', data);

    const onNext = (item: Villan): void => {
      console.log('VillanService.ServerStreamAsObservable responsess %o', item);
    };
    const onComplete = (): void => {
      console.log('VillanService.ServerStreamAsObservable completed');
    };
    subject.subscribe({
      next: onNext,
      error: null,
      complete: onComplete
    });

    let i = 0;
    setInterval(() => {
      if (i >= this.items.length) {
        subject.complete();
      }
      else {
        const item = this.items[i];
        subject.next(item);
        i += 1;
      }
    }, 1000);

    return subject.asObservable();
  }

  @GrpcStreamMethod('VillanService')
  bidirectionalStreamAsObservable(data$: Observable<VillanById>): Observable<Villan> {
    const villan$ = new Subject<Villan>();

    const onNext = (villanById: VillanById) => {
      console.log('VillanService.BidirectionalStreamAsObservable received %o', villanById);
      const item = this.items.find(({ id }) => id === villanById.id);
      console.log('VillanService.BidirectionalStreamAsObservable responsess %o', item);
      villan$.next(item);
    };
    const onComplete = (): void => {
      console.log('VillanService.BidirectionalStreamAsObservable completed');
    };
    data$.subscribe({
      next: onNext,
      error: null,
      complete: onComplete
    });

    return villan$.asObservable();
  }

  @GrpcStreamCall('VillanService')
  bidirectionalStreamAsStream(
    stream: ServerDuplexStream<VillanById, Villan>,
  ): void {
    stream.on('data', (villanById: VillanById) => {
      console.log('VillanService.BidirectionalStreamAsStream received %o', villanById);
      const item = this.items.find(({ id }) => id === villanById.id);
      console.log('VillanService.BidirectionalStreamAsStream responsess %o', item);
      stream.write(item);
    });

    stream.on('end', () => console.log('VillanService.BidirectionalStreamAsStream ended'));
  }
}
