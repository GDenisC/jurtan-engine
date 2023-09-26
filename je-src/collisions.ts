import { getCanvasInstance } from "./canvas.js";
import { Point, Rect } from "./math.js";

export const Collisions = {
    pointToPoint: (a: Point, b: Point) => a.x == b.x && a.y == b.y,
    pointToRect: (a: Point, b: Rect, addSize = false, debug = false) => {
        if (addSize) {
            b.x += b.width;
            b.y += b.height;
        }
        if (debug) {
            const { ctx } = getCanvasInstance();
            ctx.strokeStyle = 'rgb(255, 0, 0)';
            ctx.strokeRect(a.x, a.y, 10, 10);
            ctx.strokeStyle = 'rgb(0, 255, 0)';
            ctx.strokeRect(b.x, b.y, b.width, b.height);
        }
        return a.x <= b.x && b.x <= a.x + b.width && a.y <= b.y && b.y <= a.y + b.height;
    },
    checkCollision: (a: Rect, b: Rect, xs: number, ys: number, options: { subPos?: boolean, debug?: boolean }) => {
        const { subPos, debug } = options;
        let { x: x2, y: y2 } = b;
        if (subPos) {
            x2 -= b.width / 2;
            y2 -= b.height / 2;
        }
        if (debug) {
            const { ctx } = getCanvasInstance();
            ctx.strokeStyle = 'rgb(0, 0, 255)';
            ctx.strokeRect(a.x, a.y, a.width, a.height);
            ctx.strokeStyle = 'rgb(255, 0, 0)';
            ctx.strokeRect(x2, y2, b.width, b.height);
        }
        let { x, y } = a;
        x += xs;
        y += ys;
        if (debug) {
            const { ctx } = getCanvasInstance();
            ctx.strokeStyle = 'rgb(0, 255, 0)';
            ctx.strokeRect(x, y, a.width, a.height);
        }
        return (
            x + a.width  >= x2           &&
            x            <= x2 + b.width &&
            y + a.height >= y2           &&
            y            <= y2 + b.height
        );
    }
} as const;