import { getInstances } from "./canvas.js";
import { Collisions } from "./collisions.js";
import { Game } from "./game.js";
import { ImageInstance } from "./images.js";
import { Instance } from "./instance.js";

export class Point {
    constructor(public x: number, public y: number) {}
}

export class Rect extends Point {
    constructor(public x: number, public y: number, public width: number, public height: number) {
        super(x, y);
    }

    get topLeft() {
        return new Point(this.x - this.width / 2, this.y - this.height / 2);
    }

    get top() {
        return new Point(this.x, this.y - this.height / 2);
    }

    get topRight() {
        return new Point(this.x + this.width / 2, this.y - this.height / 2);
    }

    get left() {
        return new Point(this.x - this.width / 2, this.y);
    }

    get center() {
        return new Point(this.x + this.width / 2, this.y + this.height / 2);
    }

    get right() {
        return new Point(this.x + this.width / 2, this.y);
    }

    get bottomLeft() {
        return new Point(this.x - this.width / 2, this.y + this.height / 2);
    }

    get bottom() {
        return new Point(this.x, this.y + this.height / 2);
    }

    get bottomRight() {
        return new Point(this.x + this.width / 2, this.y + this.height / 2);
    }

    collide(instance: Instance, rect: Rect, xs: number, ys: number, subPos = false) {
        const collision = Collisions.checkCollision(this, rect, xs, ys, { subPos });
        Game.other = instance;
        return collision;
    }

    collideWithType(type: FunctionConstructor, xs: number, ys: number) {
        for (const instance of getInstances()) {
            const rect = instance as any['rect'];
            if (rect != null && rect != this && instance instanceof type) {
                if (this.collide(instance, rect, xs, ys, !(instance instanceof ImageInstance)))
                    return true;
            }
        }
        return false;
    }

    collideWithTypes(type: FunctionConstructor[], xs: number, ys: number) {
        for (const instance of getInstances()) {
            const rect = instance as any['rect'];
            if (rect != null && rect != this && type.some(t => instance instanceof t)) {
                if (this.collide(instance, rect, xs, ys, !(instance instanceof ImageInstance)))
                    return true;
            }
        }
        return false;
    }
}

export const GameMath = {
    // convert
    toRadians: (angle: number) => angle * Math.PI / 180,
    toAngle: (radians: number) => radians * 180 / Math.PI,

    // a, b
    distance: (a: Point, b: Point) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2),
    angleBetween: (a: Point, b: Point) => Math.atan2(b.y - a.y, b.x - a.x),

    // angle
    towardsRadians: (radians: number) => new Point(Math.cos(radians), Math.sin(radians)),
    towards: (angle: number) => GameMath.towardsRadians(GameMath.toRadians(angle)),

    // other
    random: (min: number, max: number) => Math.random() * (max - min) + min,
    sign: (x: number) => x > 0 ? 1 : x < 0 ? -1 : 0
} as const;