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
    checkCollision: (a, b, xs, ys, debug = false) => {
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
        return (a.maxX >= b.minX &&
            a.minX <= b.maxX &&
            a.maxY >= b.minY &&
            a.minY <= b.maxY);
    },
    circleToCircle: (a, b) => Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2)) <= a.radius + b.radius
};
//# sourceMappingURL=collisions.js.map