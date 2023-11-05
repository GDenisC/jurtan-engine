import { EventEmitter } from "../eventEmitter.js";

export class Socket<MessageType = Record<string | symbol, any>> extends EventEmitter {
    websocket: WebSocket | null = null;
    parseJson = true;

    constructor(public url: string) {
        super();
    }

    connect(): void;
    connect(onConnect: (socket: Socket<MessageType>) => any): void;
    connect(onConnect?: (socket: Socket<MessageType>) => any) {
        this.websocket = new WebSocket(this.url);
        this.websocket.addEventListener('open', () => this.emit('open', this));
        this.websocket.addEventListener('message', data => this.emit('message', this.parseJson ? JSON.parse(data.data) : data.data));
        this.websocket.addEventListener('close', () => this.emit('close'));
        this.websocket.addEventListener('error', error => this.emit('error', error));

        if (onConnect) {
            this.on('open', onConnect);
        }
    }

    talk(data: MessageType) {
        this.websocket?.send(JSON.stringify(data));
    }

    on(event: 'close', listener: () => any): void;
    on(event: 'error', listener: (error: Error) => any): void;
    on(event: 'open', listener: (socket: Socket<MessageType>) => any): void;
    on(event: 'message', listener: (data: MessageType) => any): void;
    on(event: string, listener: (...args: any[]) => void) {
        super.on(event, listener);
    }

    get connected() {
        return this.websocket != null;
    }
}