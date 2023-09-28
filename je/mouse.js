import { getCanvasInstance } from "./canvas.js";
import { Point } from "./math.js";
const mouse = {
    buttons: new Set(),
    x: 0,
    y: 0
};
addEventListener('mousedown', e => {
    mouse.buttons.add(e.button);
});
addEventListener('mouseup', e => {
    mouse.buttons.delete(e.button);
});
let memory = null;
addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
export const Mouse = {
    isPressed: (button) => mouse.buttons.has(button),
    getPosition: () => {
        if (!memory) {
            memory = getCanvasInstance();
        }
        const rect = memory.tag.getBoundingClientRect();
        const ratio = [
            memory.width / rect.width,
            memory.height / rect.height
        ];
        return new Point(mouse.x - rect.left * ratio[0], mouse.y - rect.top * ratio[1]);
    }
};
//# sourceMappingURL=mouse.js.map