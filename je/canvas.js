var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { images } from "./images.js";
import { Point } from "./math.js";
import { Mouse } from "./mouse.js";
import { Keyboard } from "./keyboard.js";
export const getCanvasInstance = () => {
    if (!Canvas.instance) {
        throw new Error('Canvas not initialized');
    }
    return Canvas.instance;
};
export const getInstances = () => getCanvasInstance().instances;
export class Canvas {
    constructor(options = { width: 1366, height: 768 }) {
        var _a, _b, _c, _d;
        this.instances = [];
        this.backgroundColor = 'rgb(30, 30, 30)';
        if (!Canvas.instance)
            Canvas.instance = this;
        else
            throw new Error('Canvas instance already exists, use getCanvasInstance() instead of new Canvas().');
        (_a = options.ratio) !== null && _a !== void 0 ? _a : (options.ratio = true);
        (_b = options.smooth) !== null && _b !== void 0 ? _b : (options.smooth = false);
        (_c = options.render) !== null && _c !== void 0 ? _c : (options.render = 'auto');
        (_d = options.fullscreen) !== null && _d !== void 0 ? _d : (options.fullscreen = false);
        this.options = options;
        this.tag = document.getElementById('canvas');
        if (!this.tag)
            throw new Error('Canvas not found');
        this.ctx = this.tag.getContext('2d');
        if (!this.ctx)
            throw new Error('Canvas context not found');
        this.camera = new Point(0, 0);
        this.init();
    }
    init() {
        window.addEventListener('resize', () => this.resizeWindow());
        this.resizeWindow();
        this.tag.addEventListener('contextmenu', e => e.preventDefault());
        this.tag.style.imageRendering = this.options.render;
        this.ctx.imageSmoothingEnabled = this.options.smooth;
    }
    resizeWindow() {
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
    loadAllImages() {
        return new Promise(resolve => {
            Promise.all(images.map(i => {
                if (!i.complete) {
                    return new Promise((resolve, reject) => {
                        console.log('Loading image', i.src);
                        i.onload = () => resolve(i);
                        i.onerror = () => reject(i);
                    });
                }
                return null;
            }).filter(i => i != null))
                .then(res => resolve(res))
                .catch(img => img.src = '');
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
        Mouse.update();
        Keyboard.update();
        requestAnimationFrame(this.renderLoop.bind(this));
    }
    runAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadAllImages();
            this.renderLoop();
        });
    }
    start() {
        this.runAsync();
    }
    add(instance) {
        this.instances.push(instance);
    }
    get isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
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
    get ratio() {
        return this.options.ratio ? window.devicePixelRatio : 1;
    }
    get gameRatio() {
        const { realSize } = this;
        return Math.min(realSize.width / realSize.height, realSize.height / realSize.width);
    }
}
//# sourceMappingURL=canvas.js.map