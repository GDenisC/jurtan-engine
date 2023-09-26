import { getInstances } from "./canvas.js";
import { Collisions } from "./collisions.js";
import { Game } from "./game.js";
import { ImageInstance } from "./images.js";
export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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
    collide(instance, rect, xs, ys, subPos = false) {
        const collision = Collisions.checkCollision(this, rect, xs, ys, { subPos });
        Game.other = instance;
        return collision;
    }
    collideWithType(type, xs, ys) {
        for (const instance of getInstances()) {
            const rect = instance;
            if (rect != null && rect != this && instance instanceof type) {
                if (this.collide(instance, rect, xs, ys, !(instance instanceof ImageInstance)))
                    return true;
            }
        }
        return false;
    }
    collideWithTypes(type, xs, ys) {
        for (const instance of getInstances()) {
            const rect = instance;
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
    sign: (x) => x > 0 ? 1 : x < 0 ? -1 : 0
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC5qcyIsInNvdXJjZVJvb3QiOiJqZS1zcmMvIiwic291cmNlcyI6WyJtYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDakMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUc1QyxNQUFNLE9BQU8sS0FBSztJQUNkLFlBQW1CLENBQVMsRUFBUyxDQUFTO1FBQTNCLE1BQUMsR0FBRCxDQUFDLENBQVE7UUFBUyxNQUFDLEdBQUQsQ0FBQyxDQUFRO0lBQUcsQ0FBQztDQUNyRDtBQUVELE1BQU0sT0FBTyxJQUFLLFNBQVEsS0FBSztJQUMzQixZQUFtQixDQUFTLEVBQVMsQ0FBUyxFQUFTLEtBQWEsRUFBUyxNQUFjO1FBQ3ZGLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFERyxNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBQVMsTUFBQyxHQUFELENBQUMsQ0FBUTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQVE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBRTNGLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxJQUFJLEdBQUc7UUFDSCxPQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDUixPQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDSixPQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixPQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDVixPQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixPQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDWCxPQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxD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QUNwRixPQUFPLEVBQUUsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUU5RSxRQUFRO0lBQ1IsTUFBTSxFQUFFLENBQUMsR0FBVyxFQUFFLEdBQVcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUc7SUFDdkUsSUFBSSxFQUFFLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3pDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRJbnN0YW5jZXMgfSBmcm9tIFwiLi9jYW52YXMuanNcIjtcclxuaW1wb3J0IHsgQ29sbGlzaW9ucyB9IGZyb20gXCIuL2NvbGxpc2lvbnMuanNcIjtcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL2dhbWUuanNcIjtcclxuaW1wb3J0IHsgSW1hZ2VJbnN0YW5jZSB9IGZyb20gXCIuL2ltYWdlcy5qc1wiO1xyXG5pbXBvcnQgeyBJbnN0YW5jZSB9IGZyb20gXCIuL2luc3RhbmNlLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUG9pbnQge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHg6IG51bWJlciwgcHVibGljIHk6IG51bWJlcikge31cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlY3QgZXh0ZW5kcyBQb2ludCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgeDogbnVtYmVyLCBwdWJsaWMgeTogbnVtYmVyLCBwdWJsaWMgd2lkdGg6IG51bWJlciwgcHVibGljIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRvcExlZnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnggLSB0aGlzLndpZHRoIC8gMiwgdGhpcy55IC0gdGhpcy5oZWlnaHQgLyAyKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdG9wKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy54LCB0aGlzLnkgLSB0aGlzLmhlaWdodCAvIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0b3BSaWdodCgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCArIHRoaXMud2lkdGggLyAyLCB0aGlzLnkgLSB0aGlzLmhlaWdodCAvIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBsZWZ0KCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy54IC0gdGhpcy53aWR0aCAvIDIsIHRoaXMueSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNlbnRlcigpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCArIHRoaXMud2lkdGggLyAyLCB0aGlzLnkgKyB0aGlzLmhlaWdodCAvIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCByaWdodCgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCArIHRoaXMud2lkdGggLyAyLCB0aGlzLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBib3R0b21MZWZ0KCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy54IC0gdGhpcy53aWR0aCAvIDIsIHRoaXMueSArIHRoaXMuaGVpZ2h0IC8gMik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGJvdHRvbSgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCwgdGhpcy55ICsgdGhpcy5oZWlnaHQgLyAyKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYm90dG9tUmlnaHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnggKyB0aGlzLndpZHRoIC8gMiwgdGhpcy55ICsgdGhpcy5oZWlnaHQgLyAyKTtcclxuICAgIH1cclxuXHJcbiAgICBjb2xsaWRlKGluc3RhbmNlOiBJbnN0YW5jZSwgcmVjdDogUmVjdCwgeHM6IG51bWJlciwgeXM6IG51bWJlciwgc3ViUG9zID0gZmFsc2UpIHtcclxuICAgICAgICBjb25zdCBjb2xsaXNpb24gPSBDb2xsaXNpb25zLmNoZWNrQ29sbGlzaW9uKHRoaXMsIHJlY3QsIHhzLCB5cywgeyBzdWJQb3MgfSk7XHJcbiAgICAgICAgR2FtZS5vdGhlciA9IGluc3RhbmNlO1xyXG4gICAgICAgIHJldHVybiBjb2xsaXNpb247XHJcbiAgICB9XHJcblxyXG4gICAgY29sbGlkZVdpdGhUeXBlKHR5cGU6IEZ1bmN0aW9uQ29uc3RydWN0b3IsIHhzOiBudW1iZXIsIHlzOiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGluc3RhbmNlIG9mIGdldEluc3RhbmNlcygpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBpbnN0YW5jZSBhcyBhbnlbJ3JlY3QnXTtcclxuICAgICAgICAgICAgaWYgKHJlY3QgIT0gbnVsbCAmJiByZWN0ICE9IHRoaXMgJiYgaW5zdGFuY2UgaW5zdGFuY2VvZiB0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb2xsaWRlKGluc3RhbmNlLCByZWN0LCB4cywgeXMsICEoaW5zdGFuY2UgaW5zdGFuY2VvZiBJbWFnZUluc3RhbmNlKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbGxpZGVXaXRoVHlwZXModHlwZTogRnVuY3Rpb25Db25zdHJ1Y3RvcltdLCB4czogbnVtYmVyLCB5czogbnVtYmVyKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBpbnN0YW5jZSBvZiBnZXRJbnN0YW5jZXMoKSkge1xyXG4gICAgICAgICAgICBjb25zdCByZWN0ID0gaW5zdGFuY2UgYXMgYW55WydyZWN0J107XHJcbiAgICAgICAgICAgIGlmIChyZWN0ICE9IG51bGwgJiYgcmVjdCAhPSB0aGlzICYmIHR5cGUuc29tZSh0ID0+IGluc3RhbmNlIGluc3RhbmNlb2YgdCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbGxpZGUoaW5zdGFuY2UsIHJlY3QsIHhzLCB5cywgIShpbnN0YW5jZSBpbnN0YW5jZW9mIEltYWdlSW5zdGFuY2UpKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBHYW1lTWF0aCA9IHtcclxuICAgIC8vIGNvbnZlcnRcclxuICAgIHRvUmFkaWFuczogKGFuZ2xlOiBudW1iZXIpID0+IGFuZ2xlICogTWF0aC5QSSAvIDE4MCxcclxuICAgIHRvQW5nbGU6IChyYWRpYW5zOiBudW1iZXIpID0+IHJhZGlhbnMgKiAxODAgLyBNYXRoLlBJLFxyXG5cclxuICAgIC8vIGEsIGJcclxuICAgIGRpc3RhbmNlOiAoYTogUG9pbnQsIGI6IFBvaW50KSA9PiBNYXRoLnNxcnQoKGEueCAtIGIueCkgKiogMiArIChhLnkgLSBiLnkpICoqIDIpLFxyXG4gICAgYW5nbGVCZXR3ZWVuOiAoYTogUG9pbnQsIGI6IFBvaW50KSA9PiBNYXRoLmF0YW4yKGIueSAtIGEueSwgYi54IC0gYS54KSxcclxuXHJcbiAgICAvLyBhbmdsZVxyXG4gICAgdG93YXJkc1JhZGlhbnM6IChyYWRpYW5zOiBudW1iZXIpID0+IG5ldyBQb2ludChNYXRoLmNvcyhyYWRpYW5zKSwgTWF0aC5zaW4ocmFkaWFucykpLFxyXG4gICAgdG93YXJkczogKGFuZ2xlOiBudW1iZXIpID0+IEdhbWVNYXRoLnRvd2FyZHNSYWRpYW5zKEdhbWVNYXRoLnRvUmFkaWFucyhhbmdsZSkpLFxyXG5cclxuICAgIC8vIG90aGVyXHJcbiAgICByYW5kb206IChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpID0+IE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbixcclxuICAgIHNpZ246ICh4OiBudW1iZXIpID0+IHggPiAwID8gMSA6IHggPCAwID8gLTEgOiAwXHJcbn0gYXMgY29uc3Q7Il19