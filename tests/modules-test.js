import { Canvas, Instance, Scene, ImageModule, Collisions } from '../je';

const cv = new Canvas({
    width: 1366,
    height: 768
});

let rock;

class Image extends Instance {
    onCreate() {
        this.image = this.addModule(new ImageModule('test.png'));
        this.image.width = 128;
        this.image.height = 128;
    }

    onUpdate() {
        if (!Collisions.checkCollision(this.image.rect, rock.rect, 16, 0)) {
            this.x += 16;
        } else {
            while (!Collisions.checkCollision(this.image.rect, rock.rect, 0, 0)) {
                this.x += 1;
            }
        }
    }

    onDraw() {
        this.image.draw();
    }
}

class Rock extends Instance {
    onDraw() {
        this.rectangle(0, 0, 128, 128);
        this.fill('gray');
    }

    get rect() {
        return this.getRect(128, 128);
    }
}

class MainScene extends Scene {
    onCreate() {
        const image = new Image();
        image.y = cv.center.y;
        this.add(image);

        rock = new Rock();
        rock.y = cv.center.y;
        rock.x = cv.width;
        this.add(rock);
    }
}

new MainScene();

cv.start();