import { Point, Rect } from "./math.js";
import { Canvas, getCanvasInstance } from "./canvas.js";
import { AnyColor, Color } from "./colors.js";
import { ChildrenArray } from "./childrenArray.js";

let lastInstanceId = 0;
let canvasInstance: Canvas | null = null;

export interface Rectable {
    get rect(): Rect;
}

export abstract class Instance extends ChildrenArray<Instance> {
    private firstUpdate = false;
    protected dontTranslate = false;
    protected drawChildBottom = true;
    index: number;
    depth = 0;
    x = 0;
    y = 0;
    clipStroke = false;

    constructor() {
        super();
        this.index = ++lastInstanceId;
        this.onCreate();
    }

    onCreate() {}
    onBegin() {}
    onDestroy() {}

    onUpdate() {}

    onDraw() {}

    _update(ctx: CanvasRenderingContext2D) {
        const updateChildren = () => this.children.sort((a, b) => a.depth - b.depth).forEach(child => child._update(ctx));
        ctx.save();
        this.onUpdate();
        if (!this.dontTranslate) ctx.translate(this.x, this.y);
        if (!this.firstUpdate) {
            this.onBegin();
            this.firstUpdate = true;
        }
        if (this.drawChildBottom) updateChildren();
        this.onDraw();
        if (!this.drawChildBottom) updateChildren();
        ctx.restore();
    }

    translate(x: number, y: number) {
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

    set lineWidth(w: number) {
        this.ctx.lineWidth = w;
    }

    set fontAlign(align: CanvasTextAlign) {
        this.ctx.textAlign = align;
    }

    private setColor(prop: 'fillStyle' | 'strokeStyle', c: AnyColor) {
        this.ctx[prop] = typeof c == 'string' ? c : Array.isArray(c) ? Color.from(c[0], c[1], c[2], c[3]) : Color.convert(c);
    }

    set fillColor(c: AnyColor) {
        this.setColor('fillStyle', c);
    }

    set strokeColor(c: AnyColor) {
        this.setColor('strokeStyle', c);
    }

    set fontBaseline(baseline: CanvasTextBaseline) {
        this.ctx.textBaseline = baseline;
    }

    set font(font: string) {
        this.ctx.font = font;
    }

    rectangle(x: number, y: number, width: number, height: number) {
        this.ctx.beginPath();
        this.ctx.rect(x - width / 2, y - height / 2, width, height);
        this.ctx.closePath();
    }

    circle(x: number, y: number, radius: number) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.closePath();
    }

    path(vertexes: Point[], closePath = true) {
        this.ctx.beginPath();
        this.ctx.moveTo(vertexes[0].x, vertexes[0].y);
        for (let i = 1; i < vertexes.length; i++) {
            this.ctx.lineTo(vertexes[i].x, vertexes[i].y);
        }
        if (closePath) this.ctx.closePath();
    }

    polygon(angles: number, { scale, rotation }: Partial<{ scale: number, rotation: number }>) {
        scale ??= 1;
        rotation ??= 0;
        const theta = 2 * Math.PI / angles;
        this.path(
            Array.from({ length: angles }, (_, i) => new Point(
                Math.cos(i * theta + (rotation as number) / 180 * Math.PI) * (scale as number),
                Math.sin(i * theta + (rotation as number) / 180 * Math.PI) * (scale as number)
            ))
        );
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
        } else {
            this.ctx.stroke();
        }
    }

    fillText(x: number, y: number, ...text: any[]) {
        this.ctx.fillText(text.join(' '), x, y);
    }

    strokeText(x: number, y: number, ...text: any[]) {
        this.ctx.strokeText(text.join(' '), x, y);
    }

    drawImage(image: HTMLImageElement, x: number, y: number, width: number, height: number) {
        this.ctx.drawImage(image, x - width / 2,  y - height / 2, width, height);
    }

    /**
     * @param value Alpha value from 0 to 1 (decimal).
     */
    set alpha(value: number) {
        this.ctx.globalAlpha = value;
    }

    measureText(...text: any[]) {
        return this.ctx.measureText(text.join(' '));
    }

    destroy(cleanup = true) {
        if (cleanup) this.children.forEach(child => child.destroy());
        this.onDestroy();
        this.canvas.instances.splice(this.canvas.instances.indexOf(this), 1);
    }

    getRect(width: number, height: number) {
        const { pos } = this;
        return new Rect(pos.x - width / 2, pos.y - height / 2, width, height);
    }

    isClassOf(...instancesClasses: FunctionConstructor[]) {
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

    set pos(p: Point) {
        this.x = p.x;
        this.y = p.y;
    }

    get canvas() {
        if (!canvasInstance) canvasInstance = getCanvasInstance();
        return canvasInstance;
    }

    get ctx() {
        return this.canvas.ctx;
    }
}