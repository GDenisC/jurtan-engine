if (typeof process == 'undefined') {
    throw new Error('`WebServer` can only be used in NodeJS')
}

import { existsSync, createReadStream, lstatSync } from 'fs';
import { createServer, Server } from 'http';
import { join } from 'path';
import { WebSocket, WebSocketServer } from 'ws';
import { EventEmitter } from '../eventEmitter.js';

export const mimeSet = {
    "js": "application/javascript",
    "json": "application/json",
    "css": "text/css",
    "html": "text/html",
    "md": "text/markdown",
    "png": "image/png",
    "ico": "image/x-icon"
} as any;

export type WebServerListenOptions = {
    port: number,
    dontParse?: boolean
};

export class WebServer<T extends WebSocket = WebSocket, Message = Record<string | symbol, any>> extends EventEmitter {
    private jsonParsing = true;
    http: Server;
    wss: WebSocketServer;
    sockets: T[] = [];

    constructor(directory = './dist') {
        super();
        this.wss = new WebSocketServer({ noServer: true });
        this.http = createServer((req, res) => {
            let path = '';
            if (!req.url) path = directory + '/index.html';
            else path = '.\\' + join(directory, req.url);

            if (!existsSync(path) || !lstatSync(path).isFile()) {
                path = join(directory, 'index.html');
            }

            const ext = path.split('.').pop();
            res.writeHead(200, { 'Content-Type': ext ? mimeSet[ext] || 'text/html' : 'text/html' });

            return createReadStream(path).pipe(res);
        });
    }

    listen(port: number): any;
    listen(options: WebServerListenOptions): any;
    listen(options: WebServerListenOptions | number) {
        let port: number;
        if (typeof options == 'number') {
            port = options;
        } else {
            port = options.port;
            if (options.dontParse === true) this.disableJsonParsing();
        }
        this.http.on('upgrade', (req, socket, head) => {
            this.wss.handleUpgrade(req, socket, head, ws => {
                this.sockets.push(ws as unknown as T);
                ws.addEventListener('message', data => this.emit('socketMessage', ws, this.parse(data.toString())));
                ws.on('message', data => this.emit('globalMessage', this.parse(data.toString())));
                this.emit('connection', ws);
            });
        });
        this.http.listen(port, () => console.log(`Server listening on port ${port}`));
    }

    disconnect(socket: T) {
        this.sockets.splice(this.sockets.indexOf(socket), 1);
        if (socket.readyState == WebSocket.OPEN) {
            socket.close();
        }
    }

    disableJsonParsing() {
        this.jsonParsing = false;
    }

    protected parse(data: string) {
        return this.jsonParsing ? JSON.parse(data) : data;
    }

    on(event: 'socketMessage', listener: (socket: T, data: Message) => any): void;
    on(event: 'globalMessage', listener: (data: Message) => any): void;
    on(event: 'connection', listener: (socket: T) => any): void;
    on(event: string, listener: (...args: any[]) => any) {
        super.on(event, listener);
    }
}