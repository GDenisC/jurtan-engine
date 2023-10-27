import { getCanvasInstance } from "./canvas.js";
import { Circle, Point, Rect } from "./math.js";

export const Collisions = {
    pointToPoint: (a: Point, b: Point) => a.x == b.x && a.y == b.y,
    pointToRect: (a: Point, b: Rect, addSize = false, debug = false) => {
        if (debug) {
            const { ctx } = getCanvasInstance();
            ctx.strokeStyle = 'rgb(255, 0, 0)';
            ctx.strokeRect(a.x, a.y, 4, 4);
            ctx.strokeStyle = 'rgb(0, 255, 0)';
            ctx.strokeRect(b.x, b.y, b.width, b.height);
        }
        if (addSize) {
            b.x += b.width;
            b.y += b.height;
        }
        return a.x <= b.x && b.x <= a.x + b.width && a.y <= b.y && b.y <= a.y + b.height;
    },
    checkCollision: (a: Rect, b: Rect, xs: number, ys: number, debug: boolean = false) => {
        if (debug) {
            const { ctx } = getCanvasInstance();
            ctx.strokeStyle = 'rgb(0, 0, 255)';
            ctx.strokeRect(a.x, a.y, a.width, a.height);
            ctx.strokeStyle = 'rgb(255, 0, 0)';
            ctx.strokeRect(b.x, b.y, b.width, b.height);
        }
        a.x += xs;
        a.y += ys;
        if (debug) {
            const { ctx } = getCanvasInstance();
            ctx.strokeStyle = 'rgb(0, 255, 0)';
            ctx.strokeRect(a.x, a.y, a.width, a.height);
        }
        return (
            a.maxX >= b.minX &&
            a.minX <= b.maxX &&
            a.maxY >= b.minY &&
            a.minY <= b.maxY
        );
    },
    circleToCircle: (a: Circle, b: Circle) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2) <= a.radius + b.radius
} as const;