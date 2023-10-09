import { Instance } from "./instance.js";
import { Point } from "./math.js";
type CanvasOtherOptions = {
    render: 'pixelated' | 'crisp-edges' | 'auto';
    smooth: boolean;
    ratio: boolean;
};
type CanvasResolution = {
    width: number;
    height: number;
};
export type CanvasOptions = CanvasResolution & CanvasOtherOptions;
export declare const getCanvasInstance: () => Canvas;
export declare const getInstances: () => Instance[];
export declare class Canvas {
    static instance: Canvas | null;
    tag: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    instances: Instance[];
    camera: Point;
    backgroundColor: string;
    options: CanvasOptions;
    constructor(options?: CanvasResolution & Partial<CanvasOtherOptions>);
    private init;
    private resizeWindow;
    loadAllImages(): Promise<HTMLImageElement[]>;
    renderLoop(): void;
    runAsync(): Promise<void>;
    start(): void;
    add(instance: Instance): void;
    get width(): number;
    get height(): number;
    get realSize(): {
        width: number;
        height: number;
    };
    get center(): Point;
    get ratio(): number;
}
export {};
