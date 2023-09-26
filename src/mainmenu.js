import { loadImage } from "../je/images.js";
import { Scene, Image9Instance, Point } from "../je/index.js";
import { Button, ButtonGroup } from '../je/ui/index.js';

class TestButton extends Button {
    constructor(x, y, size) {
        super(x, y, size, size);
        this.image = loadImage('slot.png');
        this.setColor(255, 255, 255);
        this.hover = false
    }

    onDraw() {
        this.drawImage(this.image, 0, 0, this.width, this.height);
        if (this.hover) {
            this.setAlpha(0.2);
            this.drawRect(0, 0, this.width, this.height);
            this.setAlpha();
        }
    }
}

class InventoryGrid extends ButtonGroup {
    constructor() {
        super();
        this.grid = new Map();

        for (let i = 0; i < this.xSize; i++) {
            for (let j = 0; j < this.ySize; j++) {
                const btn = new TestButton(i * this.cellSize, j * this.cellSize, this.cellSize)
                this.grid.set([i, j], btn);
                this.addChild(btn);
            }
        }
    }

    get xSize() {
        return 8;
    }

    get ySize() {
        return 3;
    }

    get cellSize() {
        return 48;
    }
}

export default class MainMenu extends Scene {
    frame = new Image9Instance('frame.png', 48);
    grid = new InventoryGrid();

    onBegin() {
        this.addChild(this.frame);
        this.addChild(this.grid);
        this.frame.pos = new Point(this.canvas.center.x, this.canvas.center.y);
        this.frame.width = 1000;
        this.frame.height = 123*3;
        this.grid.x = this.canvas.center.x - this.grid.cellSize * this.grid.xSize / 2;
        this.grid.y = this.canvas.center.y - this.grid.cellSize * this.grid.ySize / 2;
    }

    onDraw() {
        this.setFontAlign('center');
        this.setFontBaseline('top');
        this.setFont('48px Minecraft');
        this.drawText(this.canvas.width / 2, 24, 'Minecraft 1D');
    }
}