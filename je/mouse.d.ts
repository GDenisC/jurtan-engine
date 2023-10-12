import { Canvas } from "./canvas.js";
import { Point } from "./math.js";
export declare const Mouse: {
    buttons: Map<number, boolean>;
    position: Point;
    isPressed(button: number): boolean;
    isClicked(button: number): boolean;
    update(): void;
    isInCanvas(): boolean;
    readonly canvas: Canvas;
    on(event: 'mouseDown', listener: (e: MouseEvent) => any): void;
    on(event: 'mouseUp', listener: (e: MouseEvent) => any): void;
    on(event: 'mouseMove', listener: (e: MouseEvent) => any): void;
    listeners: Record<string, Function[]>;
    emit(event: string, ...args: any[]): void;
};
