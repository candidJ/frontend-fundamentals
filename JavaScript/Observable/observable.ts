import Observer from './Observer.ts';
import { SimpleObservable } from './simple-observable.ts';
import { SafeObservable } from './safe-observable.ts';
import { TeardownLogic } from './TeardownLogic.ts';
import { Subscription } from './subscription.ts';
import { pipe } from './pipe.ts';
import { map } from './operator.ts';

/**
 * Observable = source emitter with tear down logic
 * Accepts an callback function which has argument type Observer
 * Source emitted value are `next`ed onto listeners/subscribers with added safety of Subscription
 * returns an 'subscription' which enables listeners to unsubscribe from source at any time.
 */
export class Observable<T> {
    constructor(private sourceWrapper: (observer: Observer) => TeardownLogic) { }

    subscribe(observer: Observer): Subscription {
        const subscription = new Subscription();
        // passing subscription to SafeObservable ensures invoking complete and error methods unsubscribes the observable
        const safeObservable = new SafeObservable(observer, subscription);
        // add the tear down logic returned from 'init' observable to current subscription
        subscription.add(this.sourceWrapper(safeObservable));
        // client can invoke the 'unsubscribe' method to execute teardown logic of current subscription to close the stream
        return subscription;
    }

    // reduce the Arrays of observable to single Observable
    pipe(...fns: Array<(source: Observable<unknown>) => Observable<unknown>>): Observable<unknown> {
        return pipe(...fns)(this);
    }
}

const observer: Observer = {
    next: (value) => console.log(value),
    error: (err) => console.error(err),
    complete: () => console.info('complete')
};

const myObservable = new Observable(SimpleObservable);
const teardown = myObservable.pipe(map((value: number) => value * 9)).subscribe(observer);

setTimeout(() => {
    teardown.unsubscribe();
}, 5000);
