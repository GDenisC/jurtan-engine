import { Canvas } from '../je';

const cv = new Canvas({
    width: 1366,
    height: 768
});

import { Button } from '../je/ui';

class TestButton extends Button {
    constructor(x, y, size) {
        super(x, y, size, size);
    }

    onDraw() {
        this.rectangle(0, 0, this.width, this.height);
        this.fill('black');
        if (this.hover) {
            this.rectangle(0, 0, this.width, this.height);
            this.fill('white');
        }
    }
}

new TestButton(cv.center.x, cv.center.y, 16).addToMain();

cv.start();