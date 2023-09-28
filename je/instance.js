import { Point, Rect } from "./math.js";
import { getCanvasInstance } from "./canvas.js";
import { createColor, toCanvasColor } from "./colors.js";
import { ChildrenArray } from "./childrenArray.js";
let _instanceId = 0;
export class Instance extends ChildrenArray {
    constructor() {
        super();
        this._canvas = null;
        this.firstUpdate = false;
        this.clipStroke = false;
        this._dontTranslate = false;
        this.drawChildBottom = true;
        this.depth = 0;
        this.rotation = 0;
        this.x = 0;
        this.y = 0;
        this.index = ++_instanceId;
        this.onCreate();
    }
    onCreate() { }
    onBegin() { }
    onDestroy() { }
    onUpdate() { }
    onDraw() { }
    _update(ctx) {
        ctx.save();
        this.onUpdate();
        if (!this._dontTranslate)
            ctx.translate(this.x, this.y);
        if (!this.firstUpdate) {
            this.onBegin();
            this.firstUpdate = true;
        }
        if (this.drawChildBottom)
            this.children.sort((a, b) => a.depth - b.depth).forEach(child => child._update(ctx));
        this.onDraw();
        if (!this.drawChildBottom)
            this.children.sort((a, b) => a.depth - b.depth).forEach(child => child._update(ctx));
        ctx.restore();
    }
    setFontAlign(align) {
        this.ctx.textAlign = align;
    }
    setFillColor(color) {
        this.ctx.fillStyle = color;
    }
    setStrokeColor(color) {
        this.ctx.strokeStyle = color;
    }
    setColor(arg1, arg2, arg3, arg4) {
        if (typeof arg1 === 'object')
            this.setColor(toCanvasColor(arg1));
        else if (typeof arg1 === 'string') {
            this.setFillColor(arg1);
            this.setStrokeColor(arg1);
        }
        else
            this.setColor(createColor(arg1, arg2, arg3, arg4));
    }
    setFontBaseline(baseline) {
        this.ctx.textBaseline = baseline;
    }
    setFont(font) {
        this.ctx.font = font;
    }
    fillRect(x, y, width, height) {
        this.ctx.fillRect(x - width / 2, y - height / 2, width, height);
    }
    fillCircle(x, y, radius) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    stroke() {
        if (this.clipStroke) {
            this.ctx.save();
            this.ctx.lineWidth *= 2;
            this.ctx.clip();
            this.ctx.stroke();
            this.ctx.lineWidth /= 2;
            this.ctx.restore();
        }
        else {
            this.ctx.stroke();
        }
    }
    strokeRect(x, y, width, height) {
        this.ctx.beginPath();
        this.ctx.rect(x - width / 2, y - height / 2, width, height);
        this.stroke();
    }
    strokeCircle(x, y, radius) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.stroke();
    }
    setClipStroke(clipStroke) {
        this.clipStroke = clipStroke;
    }
    drawText(x, y, ...text) {
        this.ctx.fillText(text.join(' '), x, y);
    }
    drawImage(image, x, y, width, height) {
        this.ctx.drawImage(image, x - width / 2, y - height / 2, width, height);
    }
    setAlpha(value = 1) {
        this.ctx.globalAlpha = value;
    }
    measureText(...text) {
        return this.ctx.measureText(text.join(' '));
    }
    destroy(cleanup = true) {
        if (cleanup)
            this.children.forEach(child => child.destroy());
        this.onDestroy();
        this.canvas.instances.splice(this.canvas.instances.indexOf(this), 1);
    }
    getRect(width, height) {
        const { pos } = this;
        return new Rect(pos.x - width / 2, pos.y - height / 2, width, height);
    }
    isClassOf(...instancesClasses) {
        for (const cls of instancesClasses) {
            if (this instanceof cls)
                return true;
        }
        return false;
    }
    addToCanvas() {
        this.canvas.addChild(this);
    }
    get pos() {
        const parent = this.parent ? this.parent.pos : new Point(0, 0);
        return new Point(this.x + parent.x, this.y + parent.y);
    }
    set pos(p) {
        this.x = p.x;
        this.y = p.y;
    }
    get canvas() {
        if (!this._canvas)
            this._canvas = getCanvasInstance();
        return this._canvas;
    }
    get ctx() {
        return this.canvas.ctx;
    }
}
//# sourceMappingURL=instance.js.map