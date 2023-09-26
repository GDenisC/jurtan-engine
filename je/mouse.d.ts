import { Point } from "./math.js";
export declare const Mouse: {
    readonly isPressed: (button: number) => boolean;
    readonly getPosition: () => Point;
};
