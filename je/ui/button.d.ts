import { Instance, Rectable } from "../instances";
export declare class Button extends Instance implements Rectable {
    width: number;
    height: number;
    hover: boolean;
    hold: boolean;
    disabled: boolean;
    constructor(x: number, y: number, width: number, height: number);
    /**
     * `super.onUpdate()` is required
     */
    onUpdate(): void;
    get rect(): import("../math.js").Rect;
    onOver(): void;
    onOut(): void;
    onClick(): void;
    onClickOut(): void;
}
