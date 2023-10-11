import { Color } from "./colors.js";
import { Instance } from "./instance.js";
export declare class Grid extends Instance {
    gridSize: number;
    color: Color;
    constructor(gridSize?: number, color?: Color);
    onDraw(): void;
    drawGrid(translateCamera?: boolean): void;
}
