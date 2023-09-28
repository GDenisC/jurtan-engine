import { Instance } from "./instance.js";
import { images } from "./images.js";
import { Point } from "./math.js";
import { createColor, toCanvasColor } from "./colors.js";

type CanvasOtherOptions = Partial<{
    render: 'pixelated' | 'crisp-edges',
    smooth: boolean,
    ratio: boolean
}>;

type CanvasScreenOptions = {
    width: number,
    height: number,
    fullscreen?: false
} & CanvasOtherOptions;

type CanvasFullscreenOptions = {
    fullscreen: true
} & CanvasOtherOptions;

export type CanvasOptions = CanvasScreenOptions | CanvasFullscreenOptions;

export const getCanvasInstance = () => {
    if (!Canvas.instance) {
        throw new Error('Canvas not initialized');
    }
    return Canvas.instance;
}
export const getInstances = () => getCanvasInstance().instances;

export class Canvas {
    static instance: Canvas | null;
    options: CanvasOptions;
    tag: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    instances: Instance[] = [];
    camera: Point;
    backgroundColor = 'rgb(30, 30, 30)';

    constructor(options?: CanvasOptions) {
        if (!Canvas.instance) Canvas.instance = this;
        else throw new Error('Canvas instance already exists, use getCanvasInstance() instead of new Canvas().')

        this.options = options || {
            width: 1366,
            height: 768
        };
        this.tag = document.getElementById('canvas') as HTMLCanvasElement;

        if (!this.tag)
            throw new Error('Canvas not found');

        if (!this.options.fullscreen) {
            this.tag.width = this.options.width * this.ratio;
            this.tag.height = this.options.height * this.ratio;
        } else {
            this.tag.width = 1920;
            this.tag.height = 1280;
        }

        this.ctx = this.tag.getContext('2d') as CanvasRenderingContext2D;

        if (!this.ctx)
            throw new Error('Canvas context not found');

        this.camera = new Point(0, 0);

        this.init();
    }

    private init() {
        window.addEventListener('resize', () => this.resizeWindow())
        this.resizeWindow();
        this.tag.addEventListener('contextmenu', e => e.preventDefault())
        this.tag.style.imageRendering = this.options.render ?? 'auto';
        this.ctx.imageSmoothingEnabled = this.options.smooth ?? false;
    }

    private resizeWindow() {
        const { width, height } = this.realSize;
        if (!this.options.fullscreen) {
            this.tag.width = this.options.width * this.ratio;
            this.tag.height = this.options.height * this.ratio;
            this.tag.style.width = `${width}px`;
            this.tag.style.height = `${height}px`;
            this.tag.style.top = `${window.innerHeight / 2 - height / 2}px`;
            this.tag.style.left = `${window.innerWidth / 2 - width / 2}px`;
        } else {
            this.tag.style.width = `${window.innerWidth}px`;
            this.tag.style.height = `${window.innerHeight}px`;
        }
    }

    loadAllImages(): Promise<HTMLImageElement[]> {
        return new Promise(resolve => {
            Promise.all(images.map(i => {
                if (!i.complete) {
                    return new Promise((resolve, reject) => {
                        console.log('Loading image', i.src);
                        i.onload = () => resolve(i);
                        i.onerror = () => reject(i);
                    })
                }
                return null;
            }).filter(i => i != null) as Promise<HTMLImageElement>[])
            .then(res => resolve(res))
            .catch(img => img.src = '')
        });
    }

    renderLoop() {
        const ctx = this.ctx;
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, this.width * this.ratio, this.height * this.ratio);
        ctx.fillStyle = 'white';

        ctx.save();
        ctx.scale(this.ratio, this.ratio);
        ctx.translate(this.camera.x, this.camera.y);

        const sortedInstance = this.instances.sort((a, b) => a.depth - b.depth);

        for (const instance of sortedInstance) {
            instance._update(ctx);
        }

        ctx.restore();

        requestAnimationFrame(this.renderLoop.bind(this));
    }

    async runAsync() {
        await this.loadAllImages();
        this.renderLoop();
    }

    start() {
        this.runAsync();
    }

    addChild(instance: Instance) {
        this.instances.push(instance);

    }

    get width() {
        return this.tag.width / this.ratio;
    }

    get height() {
        return this.tag.height / this.ratio;
    }

    get realSize() {
        return {
            width: this.ratio ? this.tag.width / this.ratio : this.tag.width,
            height: this.ratio ? this.tag.height / this.ratio : this.tag.height
        };
    }

    get center() {
        return {
            x: this.width / 2,
            y: this.height / 2
        };
    }

    get ratio() {
        return this.options.ratio ? window.devicePixelRatio : 1;
    }
}