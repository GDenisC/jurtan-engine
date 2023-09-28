export class Animation {
}
export class LinealAnimation {
    getY(x) {
        return x;
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
export var AnimatorEndType;
(function (AnimatorEndType) {
    AnimatorEndType[AnimatorEndType["Repeat"] = 0] = "Repeat";
    AnimatorEndType[AnimatorEndType["Stop"] = 1] = "Stop";
    AnimatorEndType[AnimatorEndType["Reverse"] = 2] = "Reverse";
})(AnimatorEndType || (AnimatorEndType = {}));
export class Animator {
    constructor(animation, endType, stepSize) {
        this.endType = endType;
        this.stepSize = stepSize;
        this.isReverse = false;
        this.position = 0;
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
//# sourceMappingURL=animation.js.map