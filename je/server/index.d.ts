/// <reference types="node" />
import { Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import { EventEmitter } from '../eventEmitter.js';
export declare const mimeSet: any;
export type WebServerListenOptions = {
    port: number;
    dontParse?: boolean;
};
export declare class WebServer<T extends WebSocket = WebSocket, Message = Record<string | symbol, any>> extends EventEmitter {
    private jsonParsing;
    http: Server;
    wss: WebSocketServer;
    sockets: T[];
    constructor(directory?: string);
    listen(port: number): any;
    listen(options: WebServerListenOptions): any;
    disconnect(socket: T): void;
    disableJsonParsing(): void;
    protected parse(data: string): any;
    on(event: 'socketMessage', listener: (socket: T, data: Message) => any): void;
    on(event: 'globalMessage', listener: (data: Message) => any): void;
    on(event: 'connection', listener: (socket: T) => any): void;
}
