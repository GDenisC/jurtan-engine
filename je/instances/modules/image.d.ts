import Module from './main';
export declare class ImageModule extends Module {
    image: HTMLImageElement;
    width: number;
    height: number;
    constructor(url: string);
    draw(): void;
    get rect(): import("../..").Rect;
}
