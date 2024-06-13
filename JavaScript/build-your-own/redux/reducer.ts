import { CountState, Action, Reducer, Store } from "./types";

const initialState: CountState = {
    count: 0,
    isCountEven: false
};

const operationReducer: Reducer<CountState> = (previousState , action: Action): CountState => {
    console.log(previousState, "previous");
    switch (action.type) {
        case "INCREMENT": {
            return { ...previousState, count: previousState.count + 1 };
        }
        case "DECREMENT": {
            return { ...previousState, count: previousState.count - 1 };
        }
        // for any unrecognized action, return the previousState as it is
        default: return previousState;
    }
}

const isCountEvenReducer: Reducer<CountState> = (state , action: Action): CountState => {
    switch (action.type) {
        case "IS_COUNT_EVEN": {
            return { ...state, isCountEven: state.count % 2 == 0 ? true : false };
        }
        default:
            return state;
    }
}

const combineReducer: (reducers: any) => Reducer<CountState> = (reducers) => {

    return (state: CountState = initialState, action: Action): CountState => {
        const reducersKeys = Object.keys(reducers);

        return reducersKeys.reduce((nextState, key) => {
            nextState[key] = reducers[key](state[key], action);
            return nextState;
        }, {} as CountState);
    }
}
export const reducer = combineReducer({ count: operationReducer, isEvenCount: isCountEvenReducer });
