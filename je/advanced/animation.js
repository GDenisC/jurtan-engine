export class Animation {
}
export class LinealAnimation {
    getY(x) {
        return x;
    }
}
export class QuadAnimation {
    getY(x) {
        return Math.pow(x, 2);
    }
}
export class LerpAnimation {
    lerp(a, b, t) {
        return a + (b - a) * t;
    }
    getY(x) {
        return this.lerp(x, 1, x);
    }
}
export class CircAnimation {
    getY(x) {
        return 1 - Math.sin(Math.acos(x));
    }
}
export class BackAnimation {
    constructor(elastic = 1.5) {
        this.elastic = elastic;
    }
    getY(x) {
        return Math.pow(x, 2) * ((x + 1) * x - this.elastic);
    }
}
export class BounceAnimation {
    getY(x) {
        for (let a = 0, b = 1; 1; a += b, b /= 2) {
            if (x >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * x) / 4, 2) + Math.pow(b, 2);
            }
        }
    }
}
export class ElasticAnimation {
    constructor(offset = 1.5) {
        this.offset = offset;
    }
    getY(x) {
        return Math.pow(2, 10 * (x - 1)) * Math.cos(20 * Math.PI * this.offset / 3 * x);
    }
}
export var AnimationEndType;
(function (AnimationEndType) {
    AnimationEndType[AnimationEndType["Repeat"] = 0] = "Repeat";
    AnimationEndType[AnimationEndType["Stop"] = 1] = "Stop";
    AnimationEndType[AnimationEndType["Reverse"] = 2] = "Reverse";
})(AnimationEndType || (AnimationEndType = {}));
export var AnimationType;
(function (AnimationType) {
    AnimationType[AnimationType["Normal"] = 0] = "Normal";
    AnimationType[AnimationType["Reversed"] = 1] = "Reversed";
    AnimationType[AnimationType["Both"] = 2] = "Both";
})(AnimationType || (AnimationType = {}));
export class Animator {
    constructor(animation, frames = 60, endType = AnimationEndType.Repeat, animType = AnimationType.Normal) {
        this.frames = frames;
        this.endType = endType;
        this.animType = animType;
        this.isReverse = false;
        this.position = 0;
        this.animation = animation.getY;
        this.endTypes = {
            [AnimationEndType.Repeat]: () => this.position = 0,
            [AnimationEndType.Stop]: () => this.position = 1,
            [AnimationEndType.Reverse]: () => {
                this.isReverse = !this.isReverse;
                this.position = this.isReverse ? 1 : 0;
            }
        };
        this.animTypes = {
            [AnimationType.Normal]: () => this.animation(this.position),
            [AnimationType.Reversed]: () => this.easeOut(this.position),
            [AnimationType.Both]: () => this.easeInOut(this.position)
        };
    }
    update() {
        if (this.isReverse ? this.position < 0 : this.position > 1) {
            this.endTypes[this.endType]();
        }
        const result = this.animTypes[this.animType]();
        this.position += this.stepSize * (this.isReverse ? -1 : 1);
        return result;
    }
    easeOut(x) {
        return 1 - this.animation(1 - x);
    }
    easeInOut(x) {
        return x < 0.5 ? this.animation(x * 2) / 2 : (2 - this.animation(2 * (1 - x))) / 2;
    }
    get stepSize() {
        return 1 / this.frames;
    }
}
//# sourceMappingURL=animation.js.map