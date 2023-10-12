import { Canvas, Scene } from '../je/index.js';
import { AnimationEndType, AnimationType, Animator, QuadAnimation } from '../je/advanced/index.js';
import { Button, ButtonGroup } from '../je/ui/index.js';

const cv = new Canvas({
    width: 1366,
    height: 768
});

class MyBtn extends Button {
    constructor(x, y, r) {
        super(x, y, r * 2, r * 2);
        this.r = r;
    }

    onDraw() {
        this.fillColor = [255, 255, 255];
        this.circle(0, 0, this.r);
        this.fill();
        if (this.hover) {
            this.alpha = 0.2;
            this.fill([0, 0, 0]);
            this.alpha = 1;
        }
    }

    onClick() {
        console.log('clicked');
    }
}

class TestScene extends Scene {
    onCreate() {
        this.btn = new ButtonGroup();
        this.add(this.btn);

        this.btn.add(new MyBtn(0, 0, 75));

        this.anim = new Animator(new QuadAnimation(), 120, AnimationEndType.Reverse, AnimationType.Both);
    }

    onUpdate() {
        this.btn.y = cv.center.y;
        this.btn.x = cv.center.x / 2 + this.anim.update() * cv.center.x;
    }
}

new TestScene();

cv.start();