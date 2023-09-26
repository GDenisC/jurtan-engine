import { Point, Rect } from "./math.js";
import { Canvas, getCanvasInstance } from "./canvas.js";
import { toCanvasColor } from "./colors.js";
import { ChildrenArray } from "./childrenArray.js";

let _instanceId = 0;

export abstract class Instance extends ChildrenArray<Instance> {
    private _canvas: Canvas | null = null;
    private firstUpdate = false
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
        ctx.translate(this.x, this.y);
        if (!this.firstUpdate) {
            this.onBegin();
            this.firstUpdate = true;
        }
        this.onDraw();
        this.children.sort((a, b) => a.depth - b.depth).forEach(child => child._update(ctx));
        ctx.restore();
    }

    setColor(r: number, g: number, b: number, a?: number) {
        this.ctx.fillStyle = toCanvasColor({ r, g, b, a });
    }

    setFontAlign(align: CanvasTextAlign) {
        this.ctx.textAlign = align;
    }

    setFontBaseline(baseline: CanvasTextBaseline) {
        this.ctx.textBaseline = baseline;
    }

    setFont(font: string) {
        this.ctx.font = font;
    }

    drawRect(x: number, y: number, width: number, height: number, rounding?: number) {
        this.ctx.save();
        if (!rounding) {
            this.ctx.fillRect(x - width / 2, y - height / 2, width, height);
        } else {
            this.ctx.roundRect(x - width / 2, y - height / 2, width, height, rounding);
            this.ctx.fill();
        }
        this.ctx.restore();
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