import { ImageModule } from "./image";

/**
 * Warning: not tested
 */
export class SlicedImageModule extends ImageModule {
    private imageSlices: [number, number, number, number][] | null = null;

    constructor(url: string, public pad: number) {
        super(url);
        this.image.addEventListener('load', () => {
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
            ].map(([x, y]) => [x, y, pad, pad]);
        })
    }

    draw() {
        if (!this.image.src || !this.imageSlices)
            return;

        const { pad, imageSlices, image } = this;
        const { ctx } = this.instance;

        ctx.translate(-this.width / 2, -this.height / 2);

        const size = 0.5;

        let width = this.width + size,
            height = this.height + size,
            x = size,
            y = size;

        ctx.drawImage(image, ...imageSlices[0], x, y, pad, pad);
        ctx.drawImage(image, ...imageSlices[2], width - pad - x, y, pad, pad)
        ctx.drawImage(image, ...imageSlices[6], x, height - pad - y, pad, pad)
        ctx.drawImage(image, ...imageSlices[8], width - pad - x, height - pad - y, pad, pad)

        ctx.drawImage(image, ...imageSlices[1], pad, y, width - 2 * pad, pad)
        ctx.drawImage(image, ...imageSlices[7], pad, height - pad - y, width - 2 * pad, pad)
        ctx.drawImage(image, ...imageSlices[3], x, pad, pad, height - 2 * pad)
        ctx.drawImage(image, ...imageSlices[5], width - pad - x, pad, pad, height - 2 * pad)

        ctx.drawImage(image, ...imageSlices[4], pad, pad, width - 2 * pad, height - 2 * pad)
    }
}