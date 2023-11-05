import { EventEmitter } from "../eventEmitter.js";
export class Socket extends EventEmitter {
    constructor(url) {
        super();
        this.url = url;
        this.websocket = null;
        this.parseJson = true;
    }
    connect(onConnect) {
        this.websocket = new WebSocket(this.url);
        this.websocket.addEventListener('open', () => this.emit('open', this));
        this.websocket.addEventListener('message', data => this.emit('message', this.parseJson ? JSON.parse(data.data) : data.data));
        this.websocket.addEventListener('close', () => this.emit('close'));
        this.websocket.addEventListener('error', error => this.emit('error', error));
        if (onConnect) {
            this.on('open', onConnect);
        }
    }
    talk(data) {
        var _a;
        (_a = this.websocket) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify(data));
    }
    on(event, listener) {
        super.on(event, listener);
    }
    get connected() {
        return this.websocket != null;
    }
}
//# sourceMappingURL=websockets.js.map