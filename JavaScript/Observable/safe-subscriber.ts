import Observer from "./Observer";
import { Subscription } from "./subscription";

// SafeSubscriber enables safety guarantees and encapsulates tear down logic
export class SafeSubscriber implements Observer {
    isClosed = false;
    constructor(private destination: Observer, private subscription: Subscription) {
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