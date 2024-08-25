import { TeardownLogic } from "./TeardownLogic";

export class Subscription {
    private tearDowns: Set<TeardownLogic> = new Set();

    add(teardown: TeardownLogic): void {
        this.tearDowns.add(teardown);
    }

    unsubscribe() {
        for (const tearDown of this.tearDowns) {
            // execute all of the tearDown logic on unsubscribe
            tearDown();
        }

        this.tearDowns.clear();
    }
}