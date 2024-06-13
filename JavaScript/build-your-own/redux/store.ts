// Only ONE state object and reducer for the entire application
// is Singleton ? 

import { Action, Reducer } from "./types";


export function createStore<T>(reducer: Reducer<T>) {

    // subscriber list
    let subscribers: Array<() => void> = [];
    let state: T;

    /**
     * Action must be an object
     * Action must have a type
     * @param action 
     */
    function validateAction(action: Action): void {
        if (!action || typeof action != 'object' || Array.isArray(action)) {
            throw new Error('Action must an object');
        }

        if (!action.type) {
            throw new Error('Action must have a type');
        }
    }

    // dispatch an action on an event
    const dispatch = (action: Action) => {
        // validate action
        validateAction(action);
        // perform logic/update on previousState using the dispatched action and return a new state
        state = reducer(state, action);
        // notify every listener/subscriber about the change in state
        subscribers.forEach(subscriber => subscriber());
    };

    const subscribe = (subscriber: () => void) => {
        // add subscriber to subscribers/listeners list
        subscribers.push(subscriber);

        // tear down/unsubscribe logic
        return () => {
            // listener/subscriber can unsubscribe itself if no longer interested
            subscribers = subscribers.filter(sub => sub !== subscriber);
        }
    }

    function getState() {
        return Object.freeze(state);
    }

    // dummy action to produce an initial state
    dispatch({ type: '@@INIT' });
    return {
        dispatch,
        subscribe,
        getState
    }
}
