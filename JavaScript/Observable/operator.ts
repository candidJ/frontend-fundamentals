import Observer from "./Observer";
import { Observable } from "./observable";

export function map(fn: (val: any) => void): (source: Observable<any>) => Observable<any> {
    return (source: Observable<any>) => {
        return new Observable((subscriber: Observer) => {
            const teardown = source.subscribe({
                next: (value: any) => subscriber.next(fn(value)),
                error: (err: any) => subscriber.error(err),
                complete: () => subscriber.complete()
            });

            return () => teardown.unsubscribe();
        });
    };
}