import { Instance } from "./instance.js";
import { Point } from "./math.js";
type CanvasOtherOptions = {
    render: 'pixelated' | 'crisp-edges' | 'auto';
    smooth: boolean;
    ratio: boolean;
};
type CanvasScreenOptions = {
    width: number;
    height: number;
    fullscreen?: false;
};
type CanvasFullscreenOptions = {
    fullscreen: true;
};
export type CanvasOptions<Options = CanvasOtherOptions> = (CanvasScreenOptions | CanvasFullscreenOptions) & Options;
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
    constructor(options?: CanvasOptions<Partial<CanvasOtherOptions>>);
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
    /**
     * @description The ratio of the device (window)
     */
    get ratio(): number;
    get widthRatio(): number;
    get heightRatio(): number;
    /**
     * Note: this is a `fullscreen` feature
     * @description The ratio of the window
     */
    get screenRatio(): number;
}
export {};
