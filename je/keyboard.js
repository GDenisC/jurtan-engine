const keys = new Set();
let lastPressed = null;
addEventListener('keydown', (e) => {
    keys.add(e.code);
    lastPressed = e.code;
});
addEventListener('keyup', (e) => keys.delete(e.code));
export const Keyboard = {
    isPressed: (code) => keys.has(code),
    isLetterPressed: (key) => keys.has(`Key${key.toUpperCase()}`),
    last: () => lastPressed
};
//# sourceMappingURL=keyboard.js.map