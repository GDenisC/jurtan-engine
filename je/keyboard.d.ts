export declare const Keyboard: {
    keys: Map<string, boolean>;
    isHeld(code: string): boolean;
    isPressed(code: string): boolean;
    isLetterHeld(key: string): boolean;
    isLetterPressed(key: string): boolean;
    isDigitHeld(key: number): boolean;
    isDigitPressed(key: number): boolean;
    getLetter(key: string): string;
    getDigit(key: number): string;
    update(): void;
    on(event: 'keyDown', listener: (key: KeyboardEvent) => void): void;
    on(event: 'keyUp', listener: (key: KeyboardEvent) => void): void;
    listeners: Record<string, Function[]>;
    emit(event: string, ...args: any[]): void;
};
