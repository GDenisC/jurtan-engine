import { getCanvasInstance } from "./canvas.js";
import { EventEmitter } from "./eventEmitter.js";
import { Point } from "./math.js";
addEventListener('mousedown', e => Mouse.emit('mouseDown', e));
addEventListener('mouseup', e => Mouse.emit('mouseUp', e));
addEventListener('mousemove', e => Mouse.emit('mouseMove', e));
let canvasInstance = null;
export const Mouse = new class extends EventEmitter {
    constructor() {
        super();
        this.buttons = new Map();
        this.position = new Point(0, 0);
        this.on('mouseDown', e => this.buttons.set(e.button, true));
        this.on('mouseUp', e => this.buttons.delete(e.button));
        this.on('mouseMove', e => {
            const rect = this.canvas.tag.getBoundingClientRect();
            const ratio = [
                this.canvas.width / rect.width,
                this.canvas.height / rect.height
            ];
            this.position = new Point(e.clientX - rect.left * ratio[0], e.clientY - rect.top * ratio[1]);
        });
    }
    isPressed(button) {
        return this.buttons.has(button);
    }
    isClicked(button) {
        var _a;
        return (_a = this.buttons.get(button)) !== null && _a !== void 0 ? _a : false;
    }
    update() {
        this.buttons.forEach((pressed, button) => {
            if (pressed) {
                this.buttons.set(button, false);
            }
        });
    }
    get canvas() {
        if (!canvasInstance)
            canvasInstance = getCanvasInstance();
        return canvasInstance;
    }
    on(event, listener) {
        super.on(event, listener);
    }
};
//# sourceMappingURL=mouse.js.map