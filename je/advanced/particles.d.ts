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
export declare class Particle extends Instance {
    gravity: Numbers;
    speed: number;
    velocity: number;
    direction: number;
    color: Color;
    particleScale: Numbers;
    rotation: number;
    size: number;
    fadeInTime: number;
    fadeOutTime: number;
    lifetime: number;
    readonly realLifetime: number;
    opacity: number;
    constructor(gravity: Numbers, speed: number, velocity: number, direction: number, color: Color, particleScale: Numbers, rotation: number, size: number, fadeInTime: number, fadeOutTime: number, lifetime: number);
    onBeforeDraw(): void;
    /**
     * Override this method
     */
    onDraw(): void;
    onAfterDraw(): void;
    onUpdate(): void;
}
/**
 * Children of the `ParticleSpawner` class can be only `Particle`s
 */
export declare class ParticleSpawner extends Instance {
    protected classType: typeof Particle;
    protected config: ParticleSpawnerConfig;
    protected spawnTime: number;
    constructor(config: Partial<ParticleSpawnerConfig>, classType?: typeof Particle);
    onBegin(): void;
    private spawn;
    spawnParticle(): void;
    rand(range: Range<number>): number;
    rand2(range: Range<Numbers>): Numbers;
}
export {};
