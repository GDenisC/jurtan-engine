import { Instance } from "../instance.js";
export declare class Button extends Instance {
    width: number;
    height: number;
    hover: boolean;
    hold: boolean;
    color: import("../colors.js").Color;
    text: string;
    disabled: boolean;
    constructor(x: number, y: number, width: number, height: number);
    /**
     * `super.onUpdate()` is required
     */
    onUpdate(): void;
    onDraw(): void;
    get rect(): import("../math.js").Rect;
    onOver(): void;
    onOut(): void;
    onClick(): void;
    onClickOut(): void;
}
