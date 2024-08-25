import { Observable } from "./observable";

export function pipe(...fns: Array<(source: Observable<unknown>) => Observable<unknown>>) {

    return (source: Observable<unknown>) => {
        return fns.reduce((prev, fn) => fn(prev), source);
    }
}