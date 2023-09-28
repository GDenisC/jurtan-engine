import { Instance } from "./instance.js";
import { Point } from "./math.js";
type CanvasOtherOptions = Partial<{
    render: 'pixelated' | 'crisp-edges';
    smooth: boolean;
    ratio: boolean;
}>;
type CanvasScreenOptions = {
    width: number;
    height: number;
    fullscreen?: false;
} & CanvasOtherOptions;
type CanvasFullscreenOptions = {
    fullscreen: true;
} & CanvasOtherOptions;
export type CanvasOptions = CanvasScreenOptions | CanvasFullscreenOptions;
export declare const getCanvasInstance: () => Canvas;
export declare const getInstances: () => Instance[];
export declare class Canvas {
    static instance: Canvas | null;
    options: CanvasOptions;
    tag: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    instances: Instance[];
    camera: Point;
    backgroundColor: string;
    constructor(options?: CanvasOptions);
    private init;
    private resizeWindow;
    loadAllImages(): Promise<HTMLImageElement[]>;
    renderLoop(): void;
    runAsync(): Promise<void>;
    start(): void;
    addChild(instance: Instance): void;
    get width(): number;
    get height(): number;
    get realSize(): {
        width: number;
        height: number;
    };
    get center(): {
        x: number;
        y: number;
    };
    get ratio(): number;
}
export {};
