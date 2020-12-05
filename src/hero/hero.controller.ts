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

  findOne(data: HeroById): Hero {
    return this.items.find(({ id }) => id === data.id);
  }

  clientStreamExample(data$: Observable<HeroById>): Observable<Hero> {
    const hero$ = new Subject<Hero>();

    const onNext = (heroById: HeroById) => {
      const item = this.items.find(({ id }) => id === heroById.id);
      console.log('ClientStreamExample received %o', item);
      hero$.next(item);
    };
    const onComplete = () => hero$.complete();
    data$.subscribe(onNext, null, onComplete);

    return hero$.asObservable();
  };

  serverStreamExample(data: HeroById): Observable<Hero> {
    const subject = new Subject<Hero>();
    console.log('ServerStreamExample received %o', data);

    const onNext = (item: Hero): void => {
      console.log('ServerStreamExample response %o', item);
    };
    const onComplete = (): void => {
      console.log('ServerStreamExample completed');
    };
    subject.subscribe(onNext, null, onComplete);

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

  bidirectionalStreamExample(data$: Observable<HeroById>): Observable<Hero> {
    const hero$ = new Subject<Hero>();
  
    const onNext = (heroById: HeroById) => {
      const item = this.items.find(({ id }) => id === heroById.id);
      console.log('BidirectionalStreamExample response %o', item);
      hero$.next(item);
    };
    const onComplete = (): void => {
      console.log('BidirectionalStreamExample completed');
    };
    data$.subscribe(onNext, null, onComplete);
  
    return hero$.asObservable();
  }
}
