import { Color } from "./colors.js";
import { Instance } from "./instance.js";

export class Grid extends Instance {
    constructor(public gridSize = 30, public color = Color.create(0, 0, 0, 0.1)) {
        super();
        this.dontTranslate = true;
    }

    onDraw() {
        this.drawGrid();
    }

    drawGrid(translateCamera = true) {
        if (translateCamera) this.ctx.translate(-this.canvas.camera.x, -this.canvas.camera.y);
        this.strokeColor = this.color;
        this.ctx.beginPath();
        for (let x = (this.canvas.width / 2 - this.x) % this.gridSize; x < this.canvas.width; x += this.gridSize) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
        }
        for (let y = (this.canvas.height / 2 - this.y) % this.gridSize; y < this.canvas.height; y += this.gridSize) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
        }
        this.ctx.closePath();
        this.stroke();
    }
}