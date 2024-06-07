import { CountState, Action } from "./types";

const initialState: CountState = {
    count: 0
};

export function reducer(previousState = initialState, action: Action): CountState {
    switch (action.type) {
        case "INCREMENT": {
            return { ...previousState, count: previousState.count + 1 };
        }
        case "DECREMENT": {
            return { ...previousState, count: previousState.count - 1 };
        }
        default: return previousState;
    }
}