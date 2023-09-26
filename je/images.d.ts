import { Instance } from "./instance.js";
import { Point } from "./math.js";
export declare const images: HTMLImageElement[];
export declare const loadImage: (src: string) => HTMLImageElement;
export declare class ImageInstance extends Instance {
    protected image: HTMLImageElement;
    private scaleX;
    private scaleY;
    constructor(imageUrl: string);
    onDraw(): void;
    drawSelf(): void;
    get width(): number;
    set width(w: number);
    get height(): number;
    set height(h: number);
    get center(): Point;
    set center(p: Point);
    get rect(): import("./math.js").Rect;
}
export declare class Image9Instance extends Instance {
    pad: number;
    protected image: HTMLImageElement;
    private imageSlices;
    private scaleX;
    private scaleY;
    constructor(imageUrl: string, pad: number);
    onDraw(): void;
    drawSelf(): void;
    get rect(): import("./math.js").Rect;
    get width(): number;
    set width(w: number);
    get height(): number;
    set height(h: number);
    get center(): Point;
}
