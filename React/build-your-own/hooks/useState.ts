// hooks are build using Arrays

// useState for state management
console.clear();

// useState module
const MiniReact = (() => {
    // initial value passed
    // state is an array
    // use index and 

    // return useState
    let state: Array<any> = [];
    let index = 0;
    const useState = <T>(initialValue: T): [T, (value: T) => void] => {
        const localIndex = index;
        index++;
        if (state[localIndex] == null) {
            state[localIndex] = initialValue;
        }

        const setterFunction = (newValue: T) => {
            state[localIndex] = newValue;
            console.log(state[localIndex], 'inside setter function');
        }
        console.log(state[localIndex]);

        return [state[localIndex], setterFunction];
    }

    const resetIndex = () => {
        index = 0;
    };
    return {
        useState,
        resetIndex
    }
})();

const { useState, resetIndex } = MiniReact;

const component = () => {
    const [counterValue, setCounterValue] = useState<number>(0);
    console.log(counterValue, "initial value");
    if (counterValue != 1) {
        setCounterValue(1);
    }
};

// Initial render
component();

// clear the index in between re-renders
resetIndex();
// mimic Re-render by invoking component
component();