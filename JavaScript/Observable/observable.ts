import Observer from './Observer.ts';
import { SimpleObservable } from './simple-observable.ts';
import { SafeSubscriber } from './safe-subscriber.ts';
import { TearDown } from './Teardown.ts';
import { Subscription } from './subscription.ts';

// Observable = source emitter with tear down logic
// Accepts an callback function whose arguments are of type Observer
// Source emitted value are `next`ed onto listeners/subscribers
// returns an `subscribe` method which accepts Observer Interface as arguments


class Observable {
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
}

const observer: Observer = {
    next: (value) => console.log(value),
    error: (err) => console.error(err),
    complete: () => console.log('complete')
};

const myObservable = new Observable(SimpleObservable);
const teardown = myObservable.subscribe(observer);

/**
// Wrapping observer in SafeSubscriber prevents invocation of observable upon completion/error
const safeSubscription = new SafeSubscription(observer);

const myObservable = new Observable(SimpleObservable);
const teardown = myObservable.subscribe(safeSubscription);
 */

setTimeout(() => {
    teardown.unsubscribe();
}, 5000);
