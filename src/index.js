import { Canvas } from '../je/index.js';

const cv = new Canvas({
    width: 1366,
    height: 768,
    fullscreen: true
});

import { Instance } from '../je/index.js';

class Test extends Instance {
    onUpdate() {
        test.pos = cv.center.copy();
    }

    onDraw() {
        this.fillColor = 'red';
        this.circle(0, 0, 100);
        this.fill();
    }
}

const test = new Test();
test.addToMain();

cv.start();