export type CountState = {
    count: number;
}

export type Reducer<T> = (state: T, action: Action) => T

export type Action = {
    type: "@@INIT" | "INCREMENT" | "DECREMENT";
}