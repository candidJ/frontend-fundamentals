import Observer from './Observer.ts';
import { SimpleObservable } from './simple-observable.ts';
import { SafeSubscriber } from './safe-subscriber.ts';
import { TearDown } from './Teardown.ts';
import { Subscription } from './subscription.ts';
import { pipe } from './pipe.ts';
import { map } from './operator.ts';

// Observable = source emitter with tear down logic
// Accepts an callback function whose arguments are of type Observer
// Source emitted value are `next`ed onto listeners/subscribers
// returns an `subscribe` method which accepts Observer Interface as arguments


export class Observable<T> {
    constructor(private init: (observer: Observer) => TearDown) { }

    subscribe(observer: Observer): Subscription {
        const subscription = new Subscription();
        // passing subscription to SafeSubscriber ensures invoking complete and error unsubscribe the observable
        const subscriber = new SafeSubscriber(observer, subscription);
        // the observable return tearDown logic which is added to subscription
        // unsubscribe runs tearDown logic
        subscription.add(this.init(subscriber));
        return subscription;
    }

    // reduce the Arrays of observable to single Observable
    pipe(...fns: Array<(source: Observable<any>) => Observable<any>>): Observable<any> {
        return pipe(...fns)(this);
    }
}

const observer: Observer = {
    next: (value) => console.log(value),
    error: (err) => console.error(err),
    complete: () => console.log('complete')
};

const myObservable = new Observable(SimpleObservable);
const teardown = myObservable.pipe(map((value) => value * 9)).subscribe(observer);

/**
// Wrapping observer in SafeSubscriber prevents invocation of observable upon completion/error
const safeSubscription = new SafeSubscription(observer);

const myObservable = new Observable(SimpleObservable);
const teardown = myObservable.subscribe(safeSubscription);
 */

setTimeout(() => {
    teardown.unsubscribe();
}, 5000);
