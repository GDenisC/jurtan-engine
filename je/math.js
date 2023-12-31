import { getInstances } from "./canvas.js";
import { Collisions } from "./collisions.js";
export class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    copy() {
        return new Point(this.x, this.y);
    }
    static from(vec) {
        return new Point(vec.x, vec.y);
    }
}
export class Circle extends Point {
    constructor(x, y, radius) {
        super(x, y);
        this.radius = radius;
    }
    copy() {
        return new Circle(this.x, this.y, this.radius);
    }
    collides(b) {
        return Collisions.circleToCircle(this, b);
    }
}
export class Rect extends Point {
    constructor(x, y, width, height) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    copy() {
        return new Rect(this.x, this.y, this.width, this.height);
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
    get minX() {
        return this.x;
    }
    get maxX() {
        return this.x + this.width;
    }
    get minY() {
        return this.y;
    }
    get maxY() {
        return this.y + this.height;
    }
    collide(rect, xs, ys) {
        return Collisions.checkCollision(this, rect, xs, ys);
    }
    collideWithType(type, xs, ys) {
        for (const instance of getInstances()) {
            const rect = instance;
            if (rect != null && rect != this && instance instanceof type) {
                if (this.collide(rect, xs, ys))
                    return true;
            }
        }
        return false;
    }
    collideWithTypes(type, xs, ys) {
        for (const instance of getInstances()) {
            const rect = instance;
            if (rect != null && rect != this && type.some(t => instance instanceof t)) {
                if (this.collide(rect, xs, ys))
                    return true;
            }
        }
        return false;
    }
}
export const GameMath = {
    // convert
    toRadians: (angle) => angle * Math.PI / 180,
    toAngle: (radians) => radians * 180 / Math.PI,
    // a, b
    distance: (a, b) => Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2)),
    angleBetween: (a, b) => Math.atan2(b.y - a.y, b.x - a.x),
    // angle
    towardsRadians: (radians) => new Point(Math.cos(radians), Math.sin(radians)),
    towards: (angle) => GameMath.towardsRadians(GameMath.toRadians(angle)),
    // other
    random: (min, max) => Math.random() * (max - min) + min,
    randomFloor: (min, max) => Math.floor(GameMath.random(min, max)),
    randomElement: (arr) => arr[GameMath.randomFloor(0, arr.length - 1)],
    sign: (x) => x > 0 ? 1 : x < 0 ? -1 : 0,
    lerp: (a, b, t) => a * (1 - t) + b * t,
    clamp: (a, min, max) => Math.min(Math.max(a, min), max)
};
//# sourceMappingURL=math.js.map