let Listener: ((...args: unknown[]) => void) | null = null;

function computed<T>(func: (...args: unknown[]) => T) {
    let value: T;
    Listener = () => {
        value = func();
    }

    value = func();
    Listener = null;

    function getValue() {
        return value;
    }

    return getValue;
}

function signal<T>(initialValue: T) {

    let value = initialValue;
    const subscribers = new Set<(...args: unknown[]) => void>();

    function getValue() {
        if (Listener) {
            subscribers.add(Listener)
        }
        return value;
    }

    getValue.set = function (newValue: T) {
        value = newValue;
        subscribers.forEach(fn => fn());
    }

    return getValue;
}


const count = signal(0);
const doubleCount = computed(() => count() * 2);

console.log(count()); // 0
count.set(1);
console.log(count()) // 1
console.log(doubleCount()) // 2