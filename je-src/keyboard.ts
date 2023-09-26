const keys: Set<string> = new Set();
let lastPressed: string | null = null;

addEventListener('keydown', (e) => {
    keys.add(e.code)
    lastPressed = e.code;
});
addEventListener('keyup', (e) => keys.delete(e.code));

export const Keyboard = {
    isPressed: (code: string) => keys.has(code),
    isLetterPressed: (key: string) => keys.has(`Key${key.toUpperCase()}`),
    last: () => lastPressed
} as const;