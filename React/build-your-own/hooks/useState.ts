console.clear();

// Mimic React application
const MiniReact = (() => {

    // hooks are build using Arrays
    let hooks: Array<any> = [];
    let index = 0;
    const useState = <T>(initialValue: T): [T, (value: T) => void] => {
        const localIndex = index;
        if (hooks[localIndex] == null) {
            hooks[localIndex] = initialValue;
        }

        // setterFunction encloses over localIndex
        const setterFunction = (newValue: T) => {
            hooks[localIndex] = newValue;
        }

        index++;
        return [hooks[localIndex], setterFunction];
    };

    const useEffect = (callback: (...args: any[]) => void, dependencies?: Array<any>) => {
        let hasChanged = true;
        // Initial render, oldDependencies is `undefined`
        // dependencies are set at last
        // Re-render, oldDependencies becomes equal to dependencies of previous render
        const oldDependencies: Array<any> = hooks[index];

        if (oldDependencies) {
            hasChanged = false;
            if (dependencies) {
                hasChanged = dependencies.some((dependency, index) => {
                    const oldDependency = oldDependencies[index];
                    // compare old with current 
                    return Object.is(dependency, oldDependency);

                });
                console.log('hasChanged', hasChanged);
            }
        }

        // if any of the dependency has changed, re-render
        if (hasChanged) {
            callback();
        }

        // Initially index is length of hooks array
        // any dependency will be added as new element to hooks at last index
        hooks[index] = dependencies;
        index++;
    };

    const resetIndex = () => {
        index = 0;
    };

    return {
        useState,
        useEffect,
        resetIndex
    }
})();

const { useState, useEffect, resetIndex } = MiniReact;

const component = () => {
    const [counterValue, setCounterValue] = useState<number>(0);
    const [name, setName] = useState<string>("John Doe");
    useEffect(() => console.log("useEffect"), [name]);
    if (counterValue != 1) {
        setCounterValue(1);
    }

    if (name != "Jane Doe" && counterValue == 1) {
        setName("Jane Doe");
    }

    console.log(name);
    console.log(counterValue);
};

// Initial render
component();
// clear the index in between re-renders
resetIndex();
// mimic Re-render by invoking component
component();
resetIndex();
component();