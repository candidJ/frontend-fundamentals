export type CountState = {
    count: number;
    isCountEven: boolean;
}

export type Reducer<T> = (state: T, action: Action) => T

export type Action = {
    type: "@@INIT" | "INCREMENT" | "DECREMENT" | "IS_COUNT_EVEN";
}

export type Store<T> = {
    dispatch: (action: Action) => void;
    subscribe: (subscriber: () => void) => () => void;
    getState: () => T;
}