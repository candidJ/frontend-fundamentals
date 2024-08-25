import Observer from "./Observer";
import { Subscription } from "./subscription";

/* 
* SafeObservable enables 
*   - safety guarantees when invoking 'next', 'error' and 'complete' methods
*   - encapsulates tear down logic
*/
export class SafeObservable implements Observer {
    isClosed = false;
    constructor(private destination: Observer, private subscription: Subscription) {
        // add the tear down logic (mark the stream as 'closed') on init
        this.subscription.add(() => this.isClosed = true);
    }

    next(value: unknown): void {
        if (!this.isClosed) {
            this.destination.next(value);
        }
    }
    error(err: unknown): void {
        if (!this.isClosed) {
            this.isClosed = true;
            this.destination.error(err);
            this.subscription.unsubscribe();
        }
    };
    complete(): void {
        if (!this.isClosed) {
            this.isClosed = true;
            this.destination.complete();
            this.subscription.unsubscribe();
        }
    }

}