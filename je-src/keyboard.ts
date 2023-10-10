import { EventEmitter } from "./eventEmitter.js";

addEventListener('keydown', e => Keyboard.emit('keyDown', e));
addEventListener('keyup',   e => Keyboard.emit('keyUp',   e));

const keyTypes = {
    letter: 'Key',
    digit: 'Digit'
};

export const Keyboard = new class extends EventEmitter {
    keys: Map<string, boolean> = new Map();

    constructor() {
        super();
        this.on('keyDown', e => this.keys.set(e.code, true));
        this.on('keyUp',   e => this.keys.delete(e.code));
    }

    isHeld(code: string) {
        return this.keys.has(code);
    }

    isPressed(code: string) {
        return this.keys.get(code) ?? false;
    }

    isLetterHeld(key: string) {
        return this.isHeld(this.getLetter(key));
    }

    isLetterPressed(key: string) {
        return this.isPressed(this.getLetter(key));
    }

    isDigitHeld(key: number) {
        return this.isHeld(this.getDigit(key));
    }

    isDigitPressed(key: number) {
        return this.isPressed(this.getDigit(key));
    }

    getLetter(key: string) {
        return keyTypes.letter + key.toUpperCase();
    }

    getDigit(key: number) {
        return `${keyTypes.digit}${key}`;
    }

    update() {
        this.keys.forEach((pressed, key) => {
            if (pressed) {
                this.keys.set(key, false);
            }
        })
    }

    on(event: 'keyDown', listener: (key: KeyboardEvent) => void): void;
    on(event: 'keyUp', listener: (key: KeyboardEvent) => void): void;
    on(event: string, listener: (...args: any[]) => void): void {
        super.on(event, listener);
    }
}