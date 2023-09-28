import { EventEmitter } from "../eventEmitter.js";
export declare class Socket<MessageType = Record<string | symbol, any>> extends EventEmitter {
    url: string;
    websocket: WebSocket | null;
    constructor(url: string);
    connect(): void;
    talk(data: MessageType): void;
    on(event: 'close', listener: () => any): void;
    on(event: 'error', listener: (error: Error) => any): void;
    on(event: 'open', listener: (socket: Socket<MessageType>) => any): void;
    on(event: 'message', listener: (data: MessageType) => any): void;
    get connected(): boolean;
}
