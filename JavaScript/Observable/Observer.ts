export default interface Observer {
    next: (value: unknown) => void;
    error: (err: unknown) => void;
    complete: () => void;
}
