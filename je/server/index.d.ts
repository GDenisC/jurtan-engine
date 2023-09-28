/// <reference types="node" resolution-mode="require"/>
import { Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import { EventEmitter } from '../eventEmitter.js';
export declare const mimeSet: any;
export declare class WebServer<T extends WebSocket = WebSocket, Message = Record<string | symbol, any>> extends EventEmitter {
    http: Server;
    wss: WebSocketServer;
    sockets: T[];
    constructor(directory?: string);
    listen(port: number): void;
    disconnect(socket: T): void;
    on(event: 'message', listener: (data: Message) => any): void;
    on(event: 'connection', listener: (socket: T) => any): void;
}
