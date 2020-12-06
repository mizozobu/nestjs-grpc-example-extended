import { Controller } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { Hero, HeroById, HeroServiceController, HeroServiceControllerMethods } from './hero';

@HeroServiceControllerMethods()
@Controller('hero')
export class HeroController implements HeroServiceController {
  private readonly items: Hero[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  unaryCall(data: HeroById): Hero {
    console.log('HeroService.UnaryCall received %o', data);
    const item = this.items.find(({ id }) => id === data.id);
    console.log('HeroService.UnaryCall responsess %o', item);
    return item;
  }

  clientStreamAsObservable(data$: Observable<HeroById>): Observable<Hero> {
    const hero$ = new Subject<Hero>();

    const onNext = (heroById: HeroById) => {
      console.log('HeroService.ClientStreamAsObservable received %o', heroById);
      const item = this.items.find(({ id }) => id === heroById.id);
      hero$.next(item);
    };
    const onComplete = () => {
      hero$.complete()
      console.log('HeroService.ClientStreamAsObservable completed');
    };
    data$.subscribe({
      next: onNext,
      error: null,
      complete: onComplete
    });

    return hero$.asObservable();
  };

  serverStreamAsObservable(data: HeroById): Observable<Hero> {
    const subject = new Subject<Hero>();
    console.log('HeroService.ServerStreamAsObservable received %o', data);

    const onNext = (item: Hero): void => {
      console.log('HeroService.ServerStreamAsObservable responses %o', item);
    };
    const onComplete = (): void => {
      console.log('HeroService.ServerStreamAsObservable completed');
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

  bidirectionalStreamAsObservable(data$: Observable<HeroById>): Observable<Hero> {
    const hero$ = new Subject<Hero>();
  
    const onNext = (heroById: HeroById) => {
      console.log('HeroService.BidirectionalStreamAsObservable received %o', heroById);
      const item = this.items.find(({ id }) => id === heroById.id);
      console.log('HeroService.BidirectionalStreamAsObservable responses %o', item);
      hero$.next(item);
    };
    const onComplete = (): void => {
      console.log('HeroService.BidirectionalStreamAsObservable completed');
    };
    data$.subscribe({
      next: onNext,
      error: null,
      complete: onComplete
    });
  
    return hero$.asObservable();
  }
}
