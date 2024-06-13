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

    getValue.update = function <T extends (...args: any) => void>(func: T) {
        return func(value);
    }

    return getValue;
}


const mySignal = signal(2);

console.log(mySignal()); // 2
console.log(mySignal.update((v) => v + 2)); // 4
const multiplyBy2 = computed(() => 2 * mySignal());
console.log(multiplyBy2()) // 4