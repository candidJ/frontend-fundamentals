import { reducer } from "./reducer";
import { createStore } from "./store";
import { CountState } from "./types";

const store = createStore<CountState>(reducer);

// subscribers
const firstSubscriber = store.subscribe(() => console.log(store.getState(), "first subscriber"));
const secondSubscriber = store.subscribe(() => console.log(store.getState(), "second subscriber"));
const thirdSubscriber = store.subscribe(() => console.log(store.getState(), "third subscriber"));

// dispatch event
store.dispatch({
    type: "INCREMENT"
});

store.dispatch({
    type: "DECREMENT"
});

// unsubscribe second subscriber
secondSubscriber();

// only first and third subscribers are active
store.dispatch({
    type: "INCREMENT"
});

store.dispatch({
    type: "INCREMENT"
});

