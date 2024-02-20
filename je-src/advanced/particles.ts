import { Color } from "../colors";
import { Instance } from "../instances";

type Vec2<T> = [T, T];
type Numbers = Vec2<number>;
type Range<T = number> = T | Vec2<T>;

export interface ParticleSpawnerConfig {
    maxParticles: number;
    spawnRate: number;
    spawnTime: Range;
    lifetime: Range;
    speed: Range;
    velocity: Range;
    direction: Range;
    gravity: Range<Numbers>;
    scale: Range<Numbers>;
    color: Color;
    rotation: Range;
    width: Range;
    height: Range;
    fadeInTime: Range;
    fadeOutTime: Range;
    size: Range;
}

export class Particle extends Instance {
    lifetime: number;
    readonly realLifetime: number;
    opacity = 0;

    constructor(
        public gravity: Numbers,
        public speed: number,
        public velocity: number,
        public direction: number,
        public color: Color,
        public particleScale: Numbers,
        public rotation: number,
        public size: number,
        public fadeInTime: number,
        public fadeOutTime: number,
        lifetime: number
    ) {
        super();
        this.lifetime = Date.now() + lifetime;
        this.realLifetime = lifetime;
    }

    onBeforeDraw() {
        this.save();
        this.alpha = this.opacity;
        this.scale(this.particleScale[0], this.particleScale[1]);
        this.rotateAngle(this.direction);
        this.fillColor = this.color;
    }

    /**
     * Override this method
     */
    onDraw() {
        this.rectangle(0, 0, this.size, this.size);
        this.fill();
    }

    onAfterDraw() {
        this.restore();
    }

    onUpdate() {
        this.direction += this.rotation;
        this.speed += this.velocity;
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;
        let lifetime = this.lifetime - Date.now();
        if (lifetime <= 0) {
            lifetime = 0.001;
        }
        if (this.fadeInTime > 0) this.opacity = (this.realLifetime - lifetime) / this.fadeInTime;
        else this.opacity = 1;
        this.opacity *= lifetime / this.fadeOutTime;
        this.x += this.gravity[0] * lifetime;
        this.y += this.gravity[1] * lifetime;
        if (lifetime <= 0.001) {
            this.destroy();
        }
    }
}

/**
 * Children of the `ParticleSpawner` class can be only `Particle`s
 */
export class ParticleSpawner extends Instance {
    protected config: ParticleSpawnerConfig;
    protected spawnTime: number;

    constructor(config: Partial<ParticleSpawnerConfig>, protected classType: typeof Particle = Particle) {
        super();
        config.maxParticles ??= 100;
        config.spawnRate ??= 1;
        config.spawnTime ??= 100;
        config.lifetime ??= 1000;
        config.speed ??= 1;
        config.velocity ??= 0;
        config.direction ??= [0, 360];
        config.gravity ??= [0, 0];
        config.scale ??= [1, 1];
        config.color ??= Color.white;
        config.rotation ??= 0;
        config.width ??= 0;
        config.height ??= 0;
        config.fadeInTime ??= 0;
        config.fadeOutTime ??= 0;
        config.size ??= 4;
        this.config = config as ParticleSpawnerConfig;
        this.spawnTime = 0;
    }

    onBegin() {
        this.spawn();
    }

    private spawn() {
        for (let i = 0; i < this.config.spawnRate; i++) {
            this.spawnParticle();
        }
        setTimeout(() => this.spawn.apply(this), this.rand(this.config.spawnTime));
    }

    spawnParticle() {
        if (this.config.maxParticles <= this.children.length) return;
        const gravity = this.rand2(this.config.gravity);
        const speed = this.rand(this.config.speed);
        const velocity = this.rand(this.config.velocity);
        const direction = this.rand(this.config.direction);
        const color = this.config.color;
        const particleScale = this.rand2(this.config.scale);
        const rotation = this.rand(this.config.rotation);
        const size = this.rand(this.config.size);
        const fadeInTime = this.rand(this.config.fadeInTime);
        const fadeOutTime = this.rand(this.config.fadeOutTime);
        const lifetime = this.rand(this.config.lifetime);
        const x = this.x + this.rand(this.config.width);
        const y = this.y + this.rand(this.config.height);
        const instance = new this.classType(gravity, speed, velocity, direction, color, particleScale, rotation, size, fadeInTime, fadeOutTime, lifetime);
        instance.x = x;
        instance.y = y;
        this.add(instance);
    }

    rand(range: Range<number>): number {
        return Array.isArray(range) ? Math.random() * (range[1] - range[0]) + range[0] : range;
    }

    rand2(range: Range<Numbers>): Numbers {
        return Array.isArray(range) ? [this.rand(range[0]), this.rand(range[1])] : range;
    }
}