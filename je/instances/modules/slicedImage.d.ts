import { ImageModule } from "./image";
/**
 * Warning: not tested
 */
export declare class SlicedImageModule extends ImageModule {
    pad: number;
    private imageSlices;
    constructor(url: string, pad: number);
    draw(): void;
}
