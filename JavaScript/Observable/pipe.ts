import { Observable } from "./observable";

export function pipe(...fns: Array<(source: Observable<any>) => Observable<any>>) {

    return (source: Observable<any>) => {
        return fns.reduce((prev, fn) => fn(prev), source);
    }
}