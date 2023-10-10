export abstract class Animation {
    /**
     * Returns the value of the animation
     * @param x min 0, max 1
     */
    abstract getY(x: number): number;
}

export class LinealAnimation {
    getY(x: number) {
        return x;
    }
}

export class QuadAnimation {
    getY(x: number) {
        return Math.pow(x, 2);
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

export class CircAnimation {
    getY(x: number) {
        return 1 - Math.sin(Math.acos(x));
    }
}

export class BackAnimation {
    constructor(public elastic = 1.5) {}

    getY(x: number) {
        return Math.pow(x, 2) * ((x + 1) * x - this.elastic);
    }
}

export class BounceAnimation {
    getY(x: number) {
        for (let a = 0, b = 1; 1; a += b, b /= 2) {
            if (x >= (7 - 4 * a) / 11) {
              return -Math.pow((11 - 6 * a - 11 * x) / 4, 2) + Math.pow(b, 2)
            }
        }
    }
}

export class ElasticAnimation {
    constructor(public offset = 1.5) {}

    getY(x: number) {
        return Math.pow(2, 10 * (x - 1)) * Math.cos(20 * Math.PI * this.offset / 3 * x);
    }
}

export enum AnimationEndType {
    Repeat,
    Stop,
    Reverse
}

export enum AnimationType {
    Normal,
    Reversed,
    Both
}

export class Animator {
    protected endTypes: Record<AnimationEndType, () => void>;
    protected animTypes: Record<AnimationType, () => number>;
    protected isReverse: boolean = false;
    animation: (x: number) => number;
    position: number = 0;

    constructor(animation: Animation, public frames: number = 60, public endType = AnimationEndType.Repeat, public animType = AnimationType.Normal) {
        this.animation = animation.getY;

        this.endTypes = {
            [AnimationEndType.Repeat]: () => this.position = 0,
            [AnimationEndType.Stop]: () => this.position = 1,
            [AnimationEndType.Reverse]: () => {
                this.isReverse = !this.isReverse;
                this.position = this.isReverse ? 1 : 0;
            }
        }

        this.animTypes = {
            [AnimationType.Normal]: () => this.animation(this.position),
            [AnimationType.Reversed]: () => this.easeOut(this.position),
            [AnimationType.Both]: () => this.easeInOut(this.position)
        }
    }

    update() {
        if (this.isReverse ? this.position < 0 : this.position > 1) {
            this.endTypes[this.endType]();
        }
        const result = this.animTypes[this.animType]();
        this.position += this.stepSize * (this.isReverse ? -1 : 1);
        return result;
    }

    easeOut(x: number) {
        return 1 - this.animation(1 - x);
    }

    easeInOut(x: number) {
        return x < 0.5 ? this.animation(x * 2) / 2 : (2 - this.animation(2 * (1 - x))) / 2;
    }

    get stepSize() {
        return 1 / this.frames;
    }
}