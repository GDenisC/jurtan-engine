if (typeof process == 'undefined') {
    throw new Error('`WebServer` can only be used in NodeJS');
}
import { existsSync, createReadStream, lstatSync } from 'fs';
import { createServer } from 'http';
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
};
export class WebServer extends EventEmitter {
    constructor(directory = './dist') {
        super();
        this.jsonParsing = true;
        this.sockets = [];
        this.wss = new WebSocketServer({ noServer: true });
        this.http = createServer((req, res) => {
            let path = '';
            if (!req.url)
                path = directory + '/index.html';
            else
                path = '.\\' + join(directory, req.url);
            if (!existsSync(path) || !lstatSync(path).isFile()) {
                path = join(directory, 'index.html');
            }
            const ext = path.split('.').pop();
            res.writeHead(200, { 'Content-Type': ext ? mimeSet[ext] || 'text/html' : 'text/html' });
            return createReadStream(path).pipe(res);
        });
    }
    listen(options) {
        let port;
        if (typeof options == 'number') {
            port = options;
        }
        else {
            port = options.port;
            if (options.dontParse === true)
                this.disableJsonParsing();
        }
        this.http.on('upgrade', (req, socket, head) => {
            this.wss.handleUpgrade(req, socket, head, ws => {
                this.sockets.push(ws);
                ws.addEventListener('message', data => this.emit('socketMessage', ws, this.parse(data.toString())));
                ws.on('message', data => this.emit('globalMessage', this.parse(data.toString())));
                this.emit('connection', ws);
            });
        });
        this.http.listen(port, () => console.log(`Server listening on port ${port}`));
    }
    disconnect(socket) {
        this.sockets.splice(this.sockets.indexOf(socket), 1);
        if (socket.readyState == WebSocket.OPEN) {
            socket.close();
        }
    }
    disableJsonParsing() {
        this.jsonParsing = false;
    }
    parse(data) {
        return this.jsonParsing ? JSON.parse(data) : data;
    }
    on(event, listener) {
        super.on(event, listener);
    }
}
//# sourceMappingURL=index.js.map