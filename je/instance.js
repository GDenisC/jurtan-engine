import { Point, Rect } from "./math.js";
import { getCanvasInstance } from "./canvas.js";
import { toCanvasColor } from "./colors.js";
import { ChildrenArray } from "./childrenArray.js";
let _instanceId = 0;
export class Instance extends ChildrenArray {
    constructor() {
        super();
        this._canvas = null;
        this.firstUpdate = false;
        this.depth = 0;
        this.rotation = 0;
        this.x = 0;
        this.y = 0;
        this.index = ++_instanceId;
        this.onCreate();
    }
    onCreate() { }
    onBegin() { }
    onDestroy() { }
    onUpdate() { }
    onDraw() { }
    _update(ctx) {
        ctx.save();
        this.onUpdate();
        ctx.translate(this.x, this.y);
        if (!this.firstUpdate) {
            this.onBegin();
            this.firstUpdate = true;
        }
        this.onDraw();
        this.children.sort((a, b) => a.depth - b.depth).forEach(child => child._update(ctx));
        ctx.restore();
    }
    setColor(r, g, b, a) {
        this.ctx.fillStyle = toCanvasColor({ r, g, b, a });
    }
    setFontAlign(align) {
        this.ctx.textAlign = align;
    }
    setFontBaseline(baseline) {
        this.ctx.textBaseline = baseline;
    }
    setFont(font) {
        this.ctx.font = font;
    }
    drawRect(x, y, width, height, rounding) {
        this.ctx.save();
        if (!rounding) {
            this.ctx.fillRect(x - width / 2, y - height / 2, width, height);
        }
        else {
            this.ctx.roundRect(x - width / 2, y - height / 2, width, height, rounding);
            this.ctx.fill();
        }
        this.ctx.restore();
    }
    drawText(x, y, ...text) {
        this.ctx.fillText(text.join(' '), x, y);
    }
    drawImage(image, x, y, width, height) {
        this.ctx.drawImage(image, x - width / 2, y - height / 2, width, height);
    }
    setAlpha(value = 1) {
        this.ctx.globalAlpha = value;
    }
    measureText(...text) {
        return this.ctx.measureText(text.join(' '));
    }
    destroy(cleanup = true) {
        if (cleanup)
            this.children.forEach(child => child.destroy());
        this.onDestroy();
        this.canvas.instances.splice(this.canvas.instances.indexOf(this), 1);
    }
    getRect(width, height) {
        const { pos } = this;
        return new Rect(pos.x - width / 2, pos.y - height / 2, width, height);
    }
    isClassOf(...instancesClasses) {
        for (const cls of instancesClasses) {
            if (this instanceof cls)
                return true;
        }
        return false;
    }
    get pos() {
        const parent = this.parent ? this.parent.pos : new Point(0, 0);
        return new Point(this.x + parent.x, this.y + parent.y);
    }
    set pos(p) {
        this.x = p.x;
        this.y = p.y;
    }
    get canvas() {
        if (!this._canvas)
            this._canvas = getCanvasInstance();
        return this._canvas;
    }
    get ctx() {
        return this.canvas.ctx;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiamUtc3JjLyIsInNvdXJjZXMiOlsiaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDeEMsT0FBTyxFQUFVLGlCQUFpQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDNUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRW5ELElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztBQUVwQixNQUFNLE9BQWdCLFFBQVMsU0FBUSxhQUF1QjtJQVMxRDtRQUNJLEtBQUssRUFBRSxDQUFDO1FBVEosWUFBTyxHQUFrQixJQUFJLENBQUM7UUFDOUIsZ0JBQVcsR0FBRyxLQUFLLENBQUE7UUFFM0IsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixNQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ04sTUFBQyxHQUFHLENBQUMsQ0FBQztRQUlGLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxXQUFXLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxRQUFRLEtBQUksQ0FBQztJQUNiLE9BQU8sS0FBSSxDQUFDO0lBQ1osU0FBUyxLQUFJLENBQUM7SUFFZCxRQUFRLEtBQUksQ0FBQztJQUViLE1BQU0sS0FBSSxDQUFDO0lBRVgsT0FBTyxDQUFDLEdBQTZCO1FBQ2pDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lB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QUMsQ0FBUTtRQUNaLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3RELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxHQUFHO1FBQ0gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUMzQixDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQb2ludCwgUmVjdCB9IGZyb20gXCIuL21hdGguanNcIjtcclxuaW1wb3J0IHsgQ2FudmFzLCBnZXRDYW52YXNJbnN0YW5jZSB9IGZyb20gXCIuL2NhbnZhcy5qc1wiO1xyXG5pbXBvcnQgeyB0b0NhbnZhc0NvbG9yIH0gZnJvbSBcIi4vY29sb3JzLmpzXCI7XHJcbmltcG9ydCB7IENoaWxkcmVuQXJyYXkgfSBmcm9tIFwiLi9jaGlsZHJlbkFycmF5LmpzXCI7XHJcblxyXG5sZXQgX2luc3RhbmNlSWQgPSAwO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEluc3RhbmNlIGV4dGVuZHMgQ2hpbGRyZW5BcnJheTxJbnN0YW5jZT4ge1xyXG4gICAgcHJpdmF0ZSBfY2FudmFzOiBDYW52YXMgfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgZmlyc3RVcGRhdGUgPSBmYWxzZVxyXG4gICAgaW5kZXg6IG51bWJlcjtcclxuICAgIGRlcHRoID0gMDtcclxuICAgIHJvdGF0aW9uID0gMDtcclxuICAgIHggPSAwO1xyXG4gICAgeSA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmluZGV4ID0gKytfaW5zdGFuY2VJZDtcclxuICAgICAgICB0aGlzLm9uQ3JlYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DcmVhdGUoKSB7fVxyXG4gICAgb25CZWdpbigpIHt9XHJcbiAgICBvbkRlc3Ryb3koKSB7fVxyXG5cclxuICAgIG9uVXBkYXRlKCkge31cclxuXHJcbiAgICBvbkRyYXcoKSB7fVxyXG5cclxuICAgIF91cGRhdGUoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcclxuICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgIHRoaXMub25VcGRhdGUoKTtcclxuICAgICAgICBjdHgudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcclxuICAgICAgICBpZiAoIXRoaXMuZmlyc3RVcGRhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkJlZ2luKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3RVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9uRHJhdygpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uc29ydCgoYSwgYikgPT4gYS5kZXB0aCAtIGIuZGVwdGgpLmZvckVhY2goY2hpbGQgPT4gY2hpbGQuX3VwZGF0ZShjdHgpKTtcclxuICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENvbG9yKHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIsIGE/OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0b0NhbnZhc0NvbG9yKHsgciwgZywgYiwgYSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRGb250QWxpZ24oYWxpZ246IENhbnZhc1RleHRBbGlnbikge1xyXG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IGFsaWduO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEZvbnRCYXNlbGluZShiYXNlbGluZTogQ2FudmFzVGV4dEJhc2VsaW5lKSB7XHJcbiAgICAgICAgdGhpcy5jdHgudGV4dEJhc2VsaW5lID0gYmFzZWxpbmU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Rm9udChmb250OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmN0eC5mb250ID0gZm9udDtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3UmVjdCh4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHJvdW5kaW5nPzogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xyXG4gICAgICAgIGlmICghcm91bmRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoeCAtIHdpZHRoIC8gMiwgeSAtIGhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnJvdW5kUmVjdCh4IC0gd2lkdGggLyAyLCB5IC0gaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCwgcm91bmRpbmcpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3VGV4dCh4OiBudW1iZXIsIHk6IG51bWJlciwgLi4udGV4dDogYW55W10pIHtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0ZXh0LmpvaW4oJyAnKSwgeCwgeSk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd0ltYWdlKGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LCB4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoaW1hZ2UsIHggLSB3aWR0aCAvIDIsICB5IC0gaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QWxwaGEodmFsdWU6IG51bWJlciA9IDEpIHtcclxuICAgICAgICB0aGlzLmN0eC5nbG9iYWxBbHBoYSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIG1lYXN1cmVUZXh0KC4uLnRleHQ6IGFueVtdKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3R4Lm1lYXN1cmVUZXh0KHRleHQuam9pbignICcpKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95KGNsZWFudXAgPSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKGNsZWFudXApIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBjaGlsZC5kZXN0cm95KCkpO1xyXG4gICAgICAgIHRoaXMub25EZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5jYW52YXMuaW5zdGFuY2VzLnNwbGljZSh0aGlzLmNhbnZhcy5pbnN0YW5jZXMuaW5kZXhPZih0aGlzKSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVjdCh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHsgcG9zIH0gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVjdChwb3MueCAtIHdpZHRoIC8gMiwgcG9zLnkgLSBoZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBpc0NsYXNzT2YoLi4uaW5zdGFuY2VzQ2xhc3NlczogRnVuY3Rpb25Db25zdHJ1Y3RvcltdKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBjbHMgb2YgaW5zdGFuY2VzQ2xhc3Nlcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIGNscylcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBvcygpIHtcclxuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LnBvcyA6IG5ldyBQb2ludCgwLCAwKTtcclxuICAgICAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCArIHBhcmVudC54LCB0aGlzLnkgKyBwYXJlbnQueSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBvcyhwOiBQb2ludCkge1xyXG4gICAgICAgIHRoaXMueCA9IHAueDtcclxuICAgICAgICB0aGlzLnkgPSBwLnk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNhbnZhcygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2NhbnZhcykgdGhpcy5fY2FudmFzID0gZ2V0Q2FudmFzSW5zdGFuY2UoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FudmFzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjdHgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmN0eDtcclxuICAgIH1cclxufSJdfQ==