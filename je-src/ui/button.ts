import { Collisions } from "../collisions.js";
import { Instance, Rectable } from "../instance.js";
import { Mouse } from "../mouse.js";

export class Button extends Instance implements Rectable {
    hover = false;
    hold = false;
    disabled = false;

    constructor(x: number, y: number, public width: number, public height: number) {
        super();
        this.x = x;
        this.y = y;
    }

    /**
     * `super.onUpdate()` is required
     */
    onUpdate() {
        if (!this.disabled && Collisions.pointToRect(Mouse.position, this.rect, true)) {
            if (this.hover != true) {
                this.onOver();
                this.hover = true;
            }

            if (Mouse.isPressed(0)) {
                if (!this.hold) {
                    this.onClick();
                    this.hold = true;
                }
            } else {
                if (this.hold) {
                    this.onClickOut();
                    this.hold = false;
                }
            }
        } else {
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

    onOver() {}
    onOut() {}
    onClick() {}
    onClickOut() {}
}