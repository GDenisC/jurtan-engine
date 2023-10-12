import { getCanvasInstance } from "./canvas.js";
export const Collisions = {
    pointToPoint: (a, b) => a.x == b.x && a.y == b.y,
    pointToRect: (a, b, addSize = false, debug = false) => {
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
    checkCollision: (a, b, xs, ys, options) => {
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
        return (x + a.width >= x2 &&
            x <= x2 + b.width &&
            y + a.height >= y2 &&
            y <= y2 + b.height);
    },
    circleToCircle: (a, b) => Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2)) <= a.radius + b.radius
};
//# sourceMappingURL=collisions.js.map