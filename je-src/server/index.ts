
// check is NodeJS
const isNode = typeof process !== 'undefined'

if (!isNode) {
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

export class WebServer<T extends WebSocket = WebSocket, Message = Record<string | symbol, any>> extends EventEmitter {
    http: Server;
    wss: WebSocketServer;
    sockets: T[] = [];

    constructor(directory = './dist') {
        super();
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
        this.wss = new WebSocketServer({ noServer: true });
    }

    listen(port: number) {
        this.http.on('upgrade', (req, socket, head) => {
            this.wss.handleUpgrade(req, socket, head, ws => {
                this.sockets.push(ws as unknown as T);
                ws.on('message', data => this.emit('message', JSON.parse(data.toString())));
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

    on(event: 'message', listener: (data: Message) => any): void;
    on(event: 'connection', listener: (socket: T) => any): void;
    on(event: string, listener: (...args: any[]) => any) {
        super.on(event, listener);
    }
}