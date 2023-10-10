export declare abstract class Animation {
    /**
     * Returns the value of the animation
     * @param x min 0, max 1
     */
    abstract getY(x: number): number;
}
export declare class LinealAnimation {
    getY(x: number): number;
}
export declare class QuadAnimation {
    getY(x: number): number;
}
export declare class LerpAnimation {
    lerp(a: number, b: number, t: number): number;
    getY(x: number): number;
}
export declare class CircAnimation {
    getY(x: number): number;
}
export declare class BackAnimation {
    elastic: number;
    constructor(elastic?: number);
    getY(x: number): number;
}
export declare class BounceAnimation {
    getY(x: number): number | undefined;
}
export declare class ElasticAnimation {
    offset: number;
    constructor(offset?: number);
    getY(x: number): number;
}
export declare enum AnimationEndType {
    Repeat = 0,
    Stop = 1,
    Reverse = 2
}
export declare enum AnimationType {
    Normal = 0,
    Reversed = 1,
    Both = 2
}
export declare class Animator {
    frames: number;
    endType: AnimationEndType;
    animType: AnimationType;
    protected endTypes: Record<AnimationEndType, () => void>;
    protected animTypes: Record<AnimationType, () => number>;
    protected isReverse: boolean;
    animation: (x: number) => number;
    position: number;
    constructor(animation: Animation, frames?: number, endType?: AnimationEndType, animType?: AnimationType);
    update(): number;
    easeOut(x: number): number;
    easeInOut(x: number): number;
    get stepSize(): number;
}
