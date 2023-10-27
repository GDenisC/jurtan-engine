import Module from './main';
import { getCanvasInstance } from '../../canvas';
export class ImageModule extends Module {
    constructor(url) {
        super();
        this.width = -1;
        this.height = -1;
        this.image = getCanvasInstance().loadImage(url);
        this.image.addEventListener('load', () => {
            if (this.width < 0) {
                this.width = this.image.width;
            }
            if (this.height < 0) {
                this.height = this.image.height;
            }
        });
    }
    draw() {
        if (!this.image.src)
            return;
        this.instance.drawImage(this.image, 0, 0, this.width, this.height);
    }
    get rect() {
        return this.instance.getRect(this.width, this.height);
    }
}
//# sourceMappingURL=image.js.map