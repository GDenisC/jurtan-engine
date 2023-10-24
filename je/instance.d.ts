import { Point, Rect } from "./math.js";
import { Canvas } from "./canvas.js";
import { AnyColor } from "./colors.js";
import { ChildrenArray } from "./childrenArray.js";
import { Radians, Angle } from "./math.js";
export interface Rectable {
    get rect(): Rect;
}
export type DrawDirection = 'top-left' | 'top' | 'top-right' | 'left' | 'center' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right';
export declare abstract class Instance extends ChildrenArray<Instance> {
    private firstUpdate;
    protected dontTranslate: boolean;
    protected drawChildBottom: boolean;
    /**
     * Note: dont affect to text
     */
    drawDirection: DrawDirection;
    index: number;
    depth: number;
    x: number;
    y: number;
    clipStroke: boolean;
    constructor();
    onCreate(): void;
    onBegin(): void;
    onDestroy(): void;
    onUpdate(): void;
    onDraw(): void;
    _update(ctx: CanvasRenderingContext2D): void;
    translate(x: number, y: number): void;
    rotate(radians: Radians): void;
    rotateAngle(angle: Angle): void;
    scale(x: number, y: number): void;
    save(): void;
    restore(): void;
    get lineWidth(): number;
    set lineWidth(w: number);
    set fontAlign(align: CanvasTextAlign);
    private setColor;
    set fillColor(c: AnyColor);
    set strokeColor(c: AnyColor);
    set fontBaseline(baseline: CanvasTextBaseline);
    set font(font: string);
    protected getDirection(x: number, y: number, w: number, h: number, direction?: DrawDirection): [number, number];
    rectangle(x: number, y: number, width: number, height: number): void;
    roundRect(x: number, y: number, width: number, height: number, radius: number): void;
    circle(x: number, y: number, radius: number): void;
    path(vertexes: Point[], closePath?: boolean): void;
    polygon(angles: number, { scale, radians }: Partial<{
        scale: number;
        radians: Radians;
    }>): void;
    fill(): void;
    fill(color: AnyColor): void;
    stroke(): void;
    stroke(color: AnyColor): void;
    fillText(x: number, y: number, ...text: any[]): void;
    strokeText(x: number, y: number, ...text: any[]): void;
    drawImage(image: HTMLImageElement, x: number, y: number, width: number, height: number): void;
    /**
     * @param value Alpha value from 0 to 1 (decimal).
     */
    set alpha(value: number);
    measureText(...text: any[]): TextMetrics;
    destroy(cleanup?: boolean): void;
    getRect(width: number, height: number, direction?: DrawDirection): Rect;
    isChildOf(parentClass: FunctionConstructor): boolean;
    isClassOf(...instancesClasses: FunctionConstructor[]): boolean;
    addToMain(): void;
    get pos(): Point;
    set pos(p: Point);
    get canvas(): Canvas;
    get ctx(): CanvasRenderingContext2D;
}
