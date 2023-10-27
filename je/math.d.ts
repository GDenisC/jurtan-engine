export interface Copyable<T> {
    copy(): T;
}
export declare class Point implements Copyable<Point> {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    copy(): Point;
    static from(vec: {
        x: number;
        y: number;
    }): Point;
}
export declare class Circle extends Point implements Copyable<Circle> {
    radius: number;
    constructor(x: number, y: number, radius: number);
    copy(): Circle;
    collides(b: Circle): boolean;
}
export declare class Rect extends Point implements Copyable<Rect> {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number);
    copy(): Rect;
    get topLeft(): Point;
    get top(): Point;
    get topRight(): Point;
    get left(): Point;
    get center(): Point;
    get right(): Point;
    get bottomLeft(): Point;
    get bottom(): Point;
    get bottomRight(): Point;
    get minX(): number;
    get maxX(): number;
    get minY(): number;
    get maxY(): number;
    collide(rect: Rect, xs: number, ys: number): boolean;
    collideWithType(type: FunctionConstructor, xs: number, ys: number): boolean;
    collideWithTypes(type: FunctionConstructor[], xs: number, ys: number): boolean;
}
export type Radians = number;
export type Angle = number;
export declare const GameMath: {
    readonly toRadians: (angle: Angle) => Radians;
    readonly toAngle: (radians: Radians) => Angle;
    readonly distance: (a: Point, b: Point) => number;
    readonly angleBetween: (a: Point, b: Point) => number;
    readonly towardsRadians: (radians: Radians) => Point;
    readonly towards: (angle: Angle) => Point;
    readonly random: (min: number, max: number) => number;
    readonly randomFloor: (min: number, max: number) => number;
    readonly randomElement: <T>(arr: T[]) => T;
    readonly sign: (x: number) => 0 | 1 | -1;
    readonly lerp: (a: number, b: number, t: number) => number;
    readonly clamp: (a: number, min: number, max: number) => number;
};
