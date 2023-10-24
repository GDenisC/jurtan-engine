import { Instance } from "./instance.js";
import { images } from "./images.js";
import { GameMath, Point } from "./math.js";
import { Mouse } from "./mouse.js";
import { Keyboard } from "./keyboard.js";

type CanvasOtherOptions = {
    render: 'pixelated' | 'crisp-edges' | 'auto',
    smooth: boolean,
    ratio: boolean
}

type CanvasScreenOptions = {
    width: number,
    height: number,
    fullscreen?: false
};

type CanvasFullscreenOptions = {
    fullscreen: true
};

export type CanvasOptions<Options = CanvasOtherOptions> = (CanvasScreenOptions | CanvasFullscreenOptions) & Options;

export const getCanvasInstance = () => {
    if (!Canvas.instance) {
        throw new Error('Canvas not initialized');
    }
    return Canvas.instance;
}
export const getInstances = () => getCanvasInstance().instances;

export class Canvas {
    static instance: Canvas | null;
    tag: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    instances: Instance[] = [];
    camera: Point;
    backgroundColor = 'rgb(30, 30, 30)';
    options: CanvasOptions;

    constructor(options: CanvasOptions<Partial<CanvasOtherOptions>> = { width: 1366, height: 768 }) {
        if (!Canvas.instance) Canvas.instance = this;
        else throw new Error('Canvas instance already exists, use getCanvasInstance() instead of new Canvas().')

        options.ratio ??= true;
        options.smooth ??= false;
        options.render ??= 'auto';
        options.fullscreen ??= false;

        this.options = options as CanvasOptions;

        this.tag = document.getElementById('canvas') as HTMLCanvasElement;

        if (!this.tag)
            throw new Error('Canvas not found');

        if (!this.options.fullscreen) {
            this.tag.width = this.options.width * this.ratio;
            this.tag.height = this.options.height * this.ratio;
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
        this.tag.style.imageRendering = this.options.render;
        this.ctx.imageSmoothingEnabled = this.options.smooth;
    }

    private resizeWindow() {
        if (this.options.fullscreen) {
            this.tag.style.width = `${window.innerWidth}px`;
            this.tag.style.height = `${window.innerHeight}px`;
            this.tag.width = window.innerWidth * this.ratio;
            this.tag.height = window.innerHeight * this.ratio;
            return;
        }
        const { width, height } = this.realSize;
        this.tag.width = this.options.width * this.ratio;
        this.tag.height = this.options.height * this.ratio;
        this.tag.style.width = `${width}px`;
        this.tag.style.height = `${height}px`;
        this.tag.style.top = `${window.innerHeight / 2 - height / 2}px`;
        this.tag.style.left = `${window.innerWidth / 2 - width / 2}px`;
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

        const sortedInstances = [...this.instances] // copy array
                                    .sort((a, b) => a.depth - b.depth);

        for (const instance of sortedInstances) {
            instance._update(ctx);
        }

        ctx.restore();
        Mouse.update();
        Keyboard.update();
        requestAnimationFrame(this.renderLoop.bind(this));
    }

    async runAsync() {
        await this.loadAllImages();
        this.renderLoop();
    }

    start() {
        this.runAsync();
    }

    add(instance: Instance) {
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
            width: this.tag.width / this.ratio,
            height: this.tag.height / this.ratio
        };
    }

    get center() {
        return new Point(this.width / 2, this.height / 2);
    }

    /**
     * @description The ratio of the device (window)
     */
    get ratio() {
        return this.options.ratio ? window.devicePixelRatio : 1;
    }

    get widthRatio() {
        const { realSize } = this;
        return realSize.width / realSize.height;
    }

    get heightRatio() {
        const { realSize } = this;
        return realSize.height / realSize.width;
    }

    /**
     * Note: this is a `fullscreen` feature
     * @description The ratio of the window
     */
    get screenRatio() {
        return Math.min(this.widthRatio, this.heightRatio);
    }
}