import { TearDown } from "./Teardown";

export class Subscription {
    private tearDowns: Set<TearDown> = new Set();

    add(teardown: TearDown): void {
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