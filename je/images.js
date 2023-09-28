import { Instance } from "./instance.js";
export const images = [];
export const loadImage = (src) => {
    const image = images.find(i => i.id == src);
    if (image)
        return image;
    const img = new Image();
    img.src = src;
    img.id = src;
    images.push(img);
    return img;
};
export class ImageInstance extends Instance {
    constructor(imageUrl) {
        super();
        this.scaleX = 1;
        this.scaleY = 1;
        this.image = loadImage(imageUrl);
    }
    onDraw() {
        this.drawSelf();
    }
    drawSelf() {
        if (!this.image.src)
            return;
        this.drawImage(this.image, 0, 0, this.image.width * this.scaleX, this.image.height * this.scaleY);
    }
    get width() {
        return this.image.width * this.scaleX;
    }
    set width(w) {
        this.scaleX = w / this.width;
    }
    get height() {
        return this.image.height * this.scaleY;
    }
    set height(h) {
        this.scaleY = h / this.height;
    }
    get center() {
        return this.rect.center;
    }
    set center(p) {
        this.x = p.x - this.width / 2;
        this.y = p.y - this.height / 2;
    }
    get rect() {
        return this.getRect(this.width, this.height);
    }
}
// TODO: fix copy-paste
export class Image9Instance extends Instance {
    constructor(imageUrl, pad) {
        super();
        this.pad = pad;
        this.scaleX = 1;
        this.scaleY = 1;
        this.image = loadImage(imageUrl);
        this.imageSlices = [];
        new Promise(resolve => {
            this.image.addEventListener('load', resolve);
        }).then(() => {
            // define the 9 parts as [x, y, w, h]
            this.imageSlices = [
                [0, 0],
                [pad, 0],
                [pad * 2, 0],
                [0, pad],
                [pad, pad],
                [pad * 2, pad],
                [0, pad * 2],
                [pad, pad * 2],
                [pad * 2, pad * 2]
            ].map(x => [x[0], x[1], pad, pad]);
        });
    }
    onDraw() {
        this.drawSelf();
    }
    drawSelf() {
        if (!this.image.src)
            return;
        const { pad, imageSlices, image, ctx } = this;
        ctx.translate(-this.width / 2, -this.height / 2);
        const size = 0.5;
        let width = this.width + size, height = this.height + size, x = size, y = size;
        ctx.drawImage(image, ...imageSlices[0], x, y, pad, pad);
        ctx.drawImage(image, ...imageSlices[2], width - pad - x, y, pad, pad);
        ctx.drawImage(image, ...imageSlices[6], x, height - pad - y, pad, pad);
        ctx.drawImage(image, ...imageSlices[8], width - pad - x, height - pad - y, pad, pad);
        ctx.drawImage(image, ...imageSlices[1], pad, y, width - 2 * pad, pad);
        ctx.drawImage(image, ...imageSlices[7], pad, height - pad - y, width - 2 * pad, pad);
        ctx.drawImage(image, ...imageSlices[3], x, pad, pad, height - 2 * pad);
        ctx.drawImage(image, ...imageSlices[5], width - pad - x, pad, pad, height - 2 * pad);
        ctx.drawImage(image, ...imageSlices[4], pad, pad, width - 2 * pad, height - 2 * pad);
    }
    get rect() {
        return this.getRect(this.width, this.height);
    }
    get width() {
        return this.image.width * this.scaleX;
    }
    set width(w) {
        this.scaleX = w / this.width;
    }
    get height() {
        return this.image.height * this.scaleY;
    }
    set height(h) {
        this.scaleY = h / this.height;
    }
    get center() {
        return this.rect.center;
    }
}
//# sourceMappingURL=images.js.map