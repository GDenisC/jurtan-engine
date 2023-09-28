export declare class EventEmitter {
    listeners: Record<string, Function[]>;
    on(event: string, listener: (...args: any[]) => void): void;
    emit(event: string, ...args: any[]): void;
}
