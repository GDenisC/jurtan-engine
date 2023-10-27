import Module from './main';
import { getCanvasInstance } from '../../canvas';

export class ImageModule extends Module {
    image: HTMLImageElement;
    width: number = -1;
    height: number = -1;

    constructor(url: string) {
        super();
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