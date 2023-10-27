import { Collisions } from "../collisions.js";
import { Instance } from "../instances";
import { Mouse } from "../mouse.js";
export class Button extends Instance {
    constructor(x, y, width, height) {
        super();
        this.width = width;
        this.height = height;
        this.hover = false;
        this.hold = false;
        this.disabled = false;
        this.x = x;
        this.y = y;
    }
    /**
     * `super.onUpdate()` is required
     */
    onUpdate() {
        if (!this.disabled && Collisions.pointToRect(Mouse.position, this.rect, true) && Mouse.isInCanvas()) {
            if (this.hover != true) {
                this.onOver();
                this.hover = true;
            }
            if (Mouse.isPressed(0)) {
                if (!this.hold) {
                    this.onClick();
                    this.hold = true;
                }
            }
            else {
                if (this.hold) {
                    this.onClickOut();
                    this.hold = false;
                }
            }
        }
        else {
            if (this.hover != false) {
                this.onOut();
                this.hover = false;
            }
            if (this.hold) {
                this.onClickOut();
                this.hold = false;
            }
        }
    }
    get rect() {
        return this.getRect(this.width, this.height);
    }
    onOver() { }
    onOut() { }
    onClick() { }
    onClickOut() { }
}
//# sourceMappingURL=button.js.map