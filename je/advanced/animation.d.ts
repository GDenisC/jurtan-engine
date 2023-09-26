export declare abstract class Animation {
    /**
     * Returns the value of the animation
     * @param x min 0, max 1
     */
    abstract getY(x: number): number;
}
export interface AnimationConstructor {
    new (): Animation;
    getY(x: number): number;
}
export declare class LinealAnimation {
    getY(x: number): number;
}
export declare class LerpAnimation {
    lerp(a: number, b: number, t: number): number;
    getY(x: number): number;
}
export declare enum AnimatorEndType {
    Repeat = 0,
    Stop = 1,
    Reverse = 2
}
export declare class Animator {
    endType: AnimatorEndType;
    stepSize: number;
    protected isReverse: boolean;
    animation: Animation;
    position: number;
    constructor(animation: AnimationConstructor, endType: AnimatorEndType, stepSize: number);
    update(): number;
}
