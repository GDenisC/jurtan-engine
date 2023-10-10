import { EventEmitter } from "./eventEmitter.js";
addEventListener('keydown', e => Keyboard.emit('keyDown', e));
addEventListener('keyup', e => Keyboard.emit('keyUp', e));
const keyTypes = {
    letter: 'Key',
    digit: 'Digit'
};
export const Keyboard = new class extends EventEmitter {
    constructor() {
        super();
        this.keys = new Map();
        this.on('keyDown', e => this.keys.set(e.code, true));
        this.on('keyUp', e => this.keys.delete(e.code));
    }
    isHeld(code) {
        return this.keys.has(code);
    }
    isPressed(code) {
        var _a;
        return (_a = this.keys.get(code)) !== null && _a !== void 0 ? _a : false;
    }
    isLetterHeld(key) {
        return this.isHeld(this.getLetter(key));
    }
    isLetterPressed(key) {
        return this.isPressed(this.getLetter(key));
    }
    isDigitHeld(key) {
        return this.isHeld(this.getDigit(key));
    }
    isDigitPressed(key) {
        return this.isPressed(this.getDigit(key));
    }
    getLetter(key) {
        return keyTypes.letter + key.toUpperCase();
    }
    getDigit(key) {
        return `${keyTypes.digit}${key}`;
    }
    update() {
        this.keys.forEach((pressed, key) => {
            if (pressed) {
                this.keys.set(key, false);
                console.log(key);
            }
        });
    }
    on(event, listener) {
        super.on(event, listener);
    }
};
//# sourceMappingURL=keyboard.js.map