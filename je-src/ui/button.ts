import { Collisions } from "../collisions.js";
import { Color } from "../colors.js";
import { Instance } from "../instance.js";
import { Mouse } from "../mouse.js";

export class Button extends Instance {
    hover = false;
    hold = false;
    color = Color.create(255, 255, 255);
    text = 'Button';
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
        if (!this.disabled && Collisions.pointToRect(Mouse.getPosition(), this.rect, true)) {
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

    onDraw() {
        this.setColor(this.color.r, this.color.g, this.color.b, this.color.a);
        this.fillRect(this.x, this.y, this.width, this.height);
        this.setFont('24px Arial');
        this.setFontAlign('center');
        this.setFontBaseline('middle');
        this.setColor(0, 0, 0);
        this.drawText(this.x, this.y, this.text);
        this.setFontAlign('left');
        this.setFontBaseline('top');
    }

    get rect() {
        return this.getRect(this.width, this.height);
    }

    onOver() {}
    onOut() {}
    onClick() {}
    onClickOut() {}
}