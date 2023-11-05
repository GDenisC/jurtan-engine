import { Canvas, getCanvasInstance } from "./canvas.js";
import { EventEmitter } from "./eventEmitter.js";
import { Point } from "./math.js";
import { Mobile } from "./mobile.js";

let canvasInstance: Canvas | null = null;

if (Mobile.isMobile) {
    const touchToMouse = (t: TouchEvent) => {
        const touch = t.touches[0];
        if (!touch) {
            console.error('so idk, no touches');
        }
        return {
            button: touch.identifier,
            x: touch.clientX,
            y: touch.clientY
        };
    }
    addEventListener('touchstart', e => Mouse.emit('mouseDown', touchToMouse(e)))
    addEventListener('touchend',   e => Mouse.emit('mouseUp',   touchToMouse(e)))
    addEventListener('touchmove',  e => Mouse.emit('mouseMove', touchToMouse(e)))
} else {
    addEventListener('mousedown', e => Mouse.emit('mouseDown', e))
    addEventListener('mouseup',   e => Mouse.emit('mouseUp',   e))
    addEventListener('mousemove', e => Mouse.emit('mouseMove', e))
}

export const Mouse = new class extends EventEmitter {
    buttons: Map<number, boolean> = new Map();
    position: Point = new Point(0, 0);

    constructor() {
        super();
        this.on('mouseDown', e => this.buttons.set(e.button, true));
        this.on('mouseUp',   e => this.buttons.delete(e.button));
        this.on('mouseMove', e => {
            const rect = this.canvas.tag.getBoundingClientRect();
            const ratio = [
                this.canvas.width / rect.width,
                this.canvas.height / rect.height
            ]
            this.position = new Point(
                e.clientX - rect.left * ratio[0],
                e.clientY - rect.top  * ratio[1]
            );
        });
    }

    isPressed(button: number) {
        return this.buttons.has(button);
    }

    isClicked(button: number) {
        return this.buttons.get(button) ?? false;
    }

    update() {
        this.buttons.forEach((pressed, button) => {
            if (pressed) {
                this.buttons.set(button, false);
            }
        })
    }

    isInCanvas() {
        const rect = this.canvas.tag.getBoundingClientRect();
        const ratio = [
            this.canvas.width / rect.width,
            this.canvas.height / rect.height
        ];
        return this.position.x >= 0                     && this.position.y >= 0 &&
               this.position.x <= rect.width * ratio[0] && this.position.y <= rect.height * ratio[1];
    }

    get canvas() {
        if (!canvasInstance) canvasInstance = getCanvasInstance();
        return canvasInstance;
    }

    on(event: 'mouseDown', listener: (e: MouseEvent) => any): void;
    on(event: 'mouseUp', listener: (e: MouseEvent) => any): void;
    on(event: 'mouseMove', listener: (e: MouseEvent) => any): void;
    on(event: string, listener: (...args: any[]) => void) {
        super.on(event, listener);
    }
};