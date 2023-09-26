export abstract class Animation {
    /**
     * Returns the value of the animation
     * @param x min 0, max 1
     */
    abstract getY(x: number): number;
}

export interface AnimationConstructor {
    new(): Animation;
    getY(x: number): number;
}

export class LinealAnimation {
    getY(x: number) {
        return x;
    }
}

export class LerpAnimation {
    lerp(a: number, b: number, t: number) {
        return a + (b - a) * t;
    }

    getY(x: number) {
        return this.lerp(x, 1, x);
    }
}

export enum AnimatorEndType {
    Repeat,
    Stop,
    Reverse
}

export class Animator {
    protected isReverse: boolean = false;

    animation: Animation;
    position: number = 0;

    constructor(animation: AnimationConstructor, public endType: AnimatorEndType, public stepSize: number) {
        this.animation = new animation();
    }

    update() {
        if (this.isReverse ? this.position < 0 : this.position > 1) {
            switch (this.endType) {
                case AnimatorEndType.Repeat:
                    this.position = 0;
                    break;
                case AnimatorEndType.Stop:
                    this.position = 1;
                    break;
                case AnimatorEndType.Reverse:
                    this.isReverse = !this.isReverse;
                    this.position = this.isReverse ? 1 : 0;
                    break;
            }
        }
        const result = this.animation.getY(this.position);
        this.position += this.stepSize * (this.isReverse ? -1 : 1);
        return result;
    }
}