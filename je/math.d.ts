import { Instance } from "./instance.js";
export declare class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
export declare class Rect extends Point {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number);
    get topLeft(): Point;
    get top(): Point;
    get topRight(): Point;
    get left(): Point;
    get center(): Point;
    get right(): Point;
    get bottomLeft(): Point;
    get bottom(): Point;
    get bottomRight(): Point;
    collide(instance: Instance, rect: Rect, xs: number, ys: number, subPos?: boolean): boolean;
    collideWithType(type: FunctionConstructor, xs: number, ys: number): boolean;
    collideWithTypes(type: FunctionConstructor[], xs: number, ys: number): boolean;
}
export declare const GameMath: {
    readonly toRadians: (angle: number) => number;
    readonly toAngle: (radians: number) => number;
    readonly distance: (a: Point, b: Point) => number;
    readonly angleBetween: (a: Point, b: Point) => number;
    readonly towardsRadians: (radians: number) => Point;
    readonly towards: (angle: number) => Point;
    readonly random: (min: number, max: number) => number;
    readonly sign: (x: number) => 0 | 1 | -1;
};
