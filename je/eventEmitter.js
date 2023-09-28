export class EventEmitter {
    constructor() {
        this.listeners = {};
    }
    on(event, listener) {
        if (!this.listeners[event])
            this.listeners[event] = [];
        this.listeners[event].push(listener);
    }
    emit(event, ...args) {
        if (!this.listeners[event])
            return;
        this.listeners[event].forEach(listener => listener(...args));
    }
}
//# sourceMappingURL=eventEmitter.js.map