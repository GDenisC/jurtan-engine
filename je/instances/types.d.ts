import { Rect } from "../math.js";
export interface Rectable {
    get rect(): Rect;
}
export type DrawDirection = 'top-left' | 'top' | 'top-right' | 'left' | 'center' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right';
