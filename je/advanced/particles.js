import { Color } from "../colors";
import { Instance } from "../instances";
export class Particle extends Instance {
    constructor(gravity, speed, velocity, direction, color, particleScale, rotation, size, fadeInTime, fadeOutTime, lifetime) {
        super();
        this.gravity = gravity;
        this.speed = speed;
        this.velocity = velocity;
        this.direction = direction;
        this.color = color;
        this.particleScale = particleScale;
        this.rotation = rotation;
        this.size = size;
        this.fadeInTime = fadeInTime;
        this.fadeOutTime = fadeOutTime;
        this.opacity = 0;
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
        if (this.fadeInTime > 0)
            this.opacity = (this.realLifetime - lifetime) / this.fadeInTime;
        else
            this.opacity = 1;
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
    constructor(config, classType = Particle) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        super();
        this.classType = classType;
        (_a = config.maxParticles) !== null && _a !== void 0 ? _a : (config.maxParticles = 100);
        (_b = config.spawnRate) !== null && _b !== void 0 ? _b : (config.spawnRate = 1);
        (_c = config.spawnTime) !== null && _c !== void 0 ? _c : (config.spawnTime = 100);
        (_d = config.lifetime) !== null && _d !== void 0 ? _d : (config.lifetime = 1000);
        (_e = config.speed) !== null && _e !== void 0 ? _e : (config.speed = 1);
        (_f = config.velocity) !== null && _f !== void 0 ? _f : (config.velocity = 0);
        (_g = config.direction) !== null && _g !== void 0 ? _g : (config.direction = [0, 360]);
        (_h = config.gravity) !== null && _h !== void 0 ? _h : (config.gravity = [0, 0]);
        (_j = config.scale) !== null && _j !== void 0 ? _j : (config.scale = [1, 1]);
        (_k = config.color) !== null && _k !== void 0 ? _k : (config.color = Color.white);
        (_l = config.rotation) !== null && _l !== void 0 ? _l : (config.rotation = 0);
        (_m = config.width) !== null && _m !== void 0 ? _m : (config.width = 0);
        (_o = config.height) !== null && _o !== void 0 ? _o : (config.height = 0);
        (_p = config.fadeInTime) !== null && _p !== void 0 ? _p : (config.fadeInTime = 0);
        (_q = config.fadeOutTime) !== null && _q !== void 0 ? _q : (config.fadeOutTime = 0);
        (_r = config.size) !== null && _r !== void 0 ? _r : (config.size = 4);
        this.config = config;
        this.spawnTime = 0;
    }
    onBegin() {
        this.spawn();
    }
    spawn() {
        for (let i = 0; i < this.config.spawnRate; i++) {
            this.spawnParticle();
        }
        setTimeout(() => this.spawn.apply(this), this.rand(this.config.spawnTime));
    }
    spawnParticle() {
        if (this.config.maxParticles <= this.children.length)
            return;
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
    rand(range) {
        return Array.isArray(range) ? Math.random() * (range[1] - range[0]) + range[0] : range;
    }
    rand2(range) {
        return Array.isArray(range) ? [this.rand(range[0]), this.rand(range[1])] : range;
    }
}
//# sourceMappingURL=particles.js.map