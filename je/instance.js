import { Point, Rect } from "./math.js";
import { getCanvasInstance } from "./canvas.js";
import { Color } from "./colors.js";
import { ChildrenArray } from "./childrenArray.js";
let lastInstanceId = 0;
let canvasInstance = null;
export class Instance extends ChildrenArray {
    constructor() {
        super();
        this.firstUpdate = false;
        this.dontTranslate = false;
        this.drawChildBottom = true;
        this.depth = 0;
        this.x = 0;
        this.y = 0;
        this.clipStroke = false;
        this.index = ++lastInstanceId;
        this.onCreate();
    }
    onCreate() { }
    onBegin() { }
    onDestroy() { }
    onUpdate() { }
    onDraw() { }
    _update(ctx) {
        const updateChildren = () => this.children.sort((a, b) => a.depth - b.depth).forEach(child => child._update(ctx));
        ctx.save();
        this.onUpdate();
        if (!this.dontTranslate)
            ctx.translate(this.x, this.y);
        if (!this.firstUpdate) {
            this.onBegin();
            this.firstUpdate = true;
        }
        if (this.drawChildBottom)
            updateChildren();
        this.onDraw();
        if (!this.drawChildBottom)
            updateChildren();
        ctx.restore();
    }
    translate(x, y) {
        this.ctx.translate(x, y);
    }
    save() {
        this.ctx.save();
    }
    restore() {
        this.ctx.restore();
    }
    get lineWidth() {
        return this.ctx.lineWidth;
    }
    set lineWidth(w) {
        this.ctx.lineWidth = w;
    }
    set fontAlign(align) {
        this.ctx.textAlign = align;
    }
    setColor(prop, c) {
        this.ctx[prop] = typeof c == 'string' ? c : Array.isArray(c) ? Color.from(c[0], c[1], c[2], c[3]) : Color.convert(c);
    }
    set fillColor(c) {
        this.setColor('fillStyle', c);
    }
    set strokeColor(c) {
        this.setColor('strokeStyle', c);
    }
    set fontBaseline(baseline) {
        this.ctx.textBaseline = baseline;
    }
    set font(font) {
        this.ctx.font = font;
    }
    rectangle(x, y, width, height) {
        this.ctx.beginPath();
        this.ctx.rect(x - width / 2, y - height / 2, width, height);
        this.ctx.closePath();
    }
    circle(x, y, radius) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.closePath();
    }
    path(vertexes, closePath = true) {
        this.ctx.beginPath();
        this.ctx.moveTo(vertexes[0].x, vertexes[0].y);
        for (let i = 1; i < vertexes.length; i++) {
            this.ctx.lineTo(vertexes[i].x, vertexes[i].y);
        }
        if (closePath)
            this.ctx.closePath();
    }
    polygon(angles, { scale, rotation }) {
        scale !== null && scale !== void 0 ? scale : (scale = 1);
        rotation !== null && rotation !== void 0 ? rotation : (rotation = 0);
        const theta = 2 * Math.PI / angles;
        this.path(Array.from({ length: angles }, (_, i) => new Point(Math.cos(i * theta + rotation / 180 * Math.PI) * scale, Math.sin(i * theta + rotation / 180 * Math.PI) * scale)));
    }
    fill() {
        this.ctx.fill();
    }
    stroke() {
        if (this.clipStroke) {
            this.save();
            {
                this.lineWidth *= 2;
                this.ctx.clip();
                this.ctx.stroke();
                this.lineWidth /= 2;
            }
            this.restore();
        }
        else {
            this.ctx.stroke();
        }
    }
    fillText(x, y, ...text) {
        this.ctx.fillText(text.join(' '), x, y);
    }
    strokeText(x, y, ...text) {
        this.ctx.strokeText(text.join(' '), x, y);
    }
    drawImage(image, x, y, width, height) {
        this.ctx.drawImage(image, x - width / 2, y - height / 2, width, height);
    }
    /**
     * @param value Alpha value from 0 to 1 (decimal).
     */
    set alpha(value) {
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
    addToMain() {
        this.canvas.add(this);
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
        if (!canvasInstance)
            canvasInstance = getCanvasInstance();
        return canvasInstance;
    }
    get ctx() {
        return this.canvas.ctx;
    }
}
//# sourceMappingURL=instance.js.map