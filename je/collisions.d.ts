import { Circle, Point, Rect } from "./math.js";
export declare const Collisions: {
    readonly pointToPoint: (a: Point, b: Point) => boolean;
    readonly pointToRect: (a: Point, b: Rect, addSize?: boolean, debug?: boolean) => boolean;
    readonly checkCollision: (a: Rect, b: Rect, xs: number, ys: number, debug?: boolean) => boolean;
    readonly circleToCircle: (a: Circle, b: Circle) => boolean;
};
