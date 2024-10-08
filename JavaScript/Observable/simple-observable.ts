import Observer from "./Observer";
import { TeardownLogic } from "./TeardownLogic";

export function SimpleObservable(observer: Observer): TeardownLogic {
    let id = 0;
    const intervalId = setInterval(() => {
        observer.next(id++);
        if (id > 2) {
            observer.complete();
            // no effect
            observer.next(199);
            observer.error(new Error('Error message'));
        }
    }, 1000);

    return () => {
        console.log('tearing down');
        clearInterval(intervalId);
    }
}