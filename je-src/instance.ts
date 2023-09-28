import { Point, Rect } from "./math.js";
import { Canvas, getCanvasInstance } from "./canvas.js";
import { Color, createColor, toCanvasColor } from "./colors.js";
import { ChildrenArray } from "./childrenArray.js";

let _instanceId = 0;

export abstract class Instance extends ChildrenArray<Instance> {
    private _canvas: Canvas | null = null;
    private firstUpdate = false;
    private clipStroke = false;
    protected _dontTranslate = false;
    protected drawChildBottom = true;
    index: number;
    depth = 0;
    rotation = 0;
    x = 0;
    y = 0;

    constructor() {
        super();
        this.index = ++_instanceId;
        this.onCreate();
    }

    onCreate() {}
    onBegin() {}
    onDestroy() {}

    onUpdate() {}

    onDraw() {}

    _update(ctx: CanvasRenderingContext2D) {
        ctx.save();
        this.onUpdate();
        if (!this._dontTranslate) ctx.translate(this.x, this.y);
        if (!this.firstUpdate) {
            this.onBegin();
            this.firstUpdate = true;
        }
        if (this.drawChildBottom) this.children.sort((a, b) => a.depth - b.depth).forEach(child => child._update(ctx));
        this.onDraw();
        if (!this.drawChildBottom) this.children.sort((a, b) => a.depth - b.depth).forEach(child => child._update(ctx));
        ctx.restore();
    }

    setFontAlign(align: CanvasTextAlign) {
        this.ctx.textAlign = align;
    }

    setFillColor(color: string) {
        this.ctx.fillStyle = color;
    }

    setStrokeColor(color: string) {
        this.ctx.strokeStyle = color;
    }

    setColor(color: Color): void;
    setColor(r: number, g: number, b: number, a?: number): void;
    setColor(color: string): void;
    setColor(arg1: Color | number | string, arg2?: number, arg3?: number, arg4?: number) {
        if (typeof arg1 === 'object') this.setColor(toCanvasColor(arg1));
        else if (typeof arg1 === 'string') {
            this.setFillColor(arg1);
            this.setStrokeColor(arg1);
        }
        else this.setColor(createColor(arg1, arg2 as number, arg3 as number, arg4 as number));
    }

    setFontBaseline(baseline: CanvasTextBaseline) {
        this.ctx.textBaseline = baseline;
    }

    setFont(font: string) {
        this.ctx.font = font;
    }

    fillRect(x: number, y: number, width: number, height: number) {
        this.ctx.fillRect(x - width / 2, y - height / 2, width, height);
    }

    fillCircle(x: number, y: number, radius: number) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    private stroke() {
        if (this.clipStroke) {
            this.ctx.save();
            this.ctx.lineWidth *= 2;
            this.ctx.clip();
            this.ctx.stroke();
            this.ctx.lineWidth /= 2;
            this.ctx.restore();
        } else {
            this.ctx.stroke();
        }
    }

    strokeRect(x: number, y: number, width: number, height: number) {
        this.ctx.beginPath();
        this.ctx.rect(x - width / 2, y - height / 2, width, height);
        this.stroke();
    }

    strokeCircle(x: number, y: number, radius: number) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.stroke();
    }

    setClipStroke(clipStroke: boolean) {
        this.clipStroke = clipStroke;
    }

    drawText(x: number, y: number, ...text: any[]) {
        this.ctx.fillText(text.join(' '), x, y);
    }

    drawImage(image: HTMLImageElement, x: number, y: number, width: number, height: number) {
        this.ctx.drawImage(image, x - width / 2,  y - height / 2, width, height);
    }

    setAlpha(value: number = 1) {
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

    addToCanvas() {
        this.canvas.addChild(this);
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
        if (!this._canvas) this._canvas = getCanvasInstance();
        return this._canvas;
    }

    get ctx() {
        return this.canvas.ctx;
    }
}