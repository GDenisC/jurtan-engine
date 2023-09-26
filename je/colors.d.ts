export type ColorRGB = {
    r: number;
    g: number;
    b: number;
};
export type ColorRGBA = {
    a: number;
} & ColorRGB;
export type Color = ColorRGB & Partial<ColorRGBA>;
export declare const createColor: (r: number, g: number, b: number, a?: number) => Color;
export declare const toCanvasColor: (color: Color) => string;
export declare const newColor: (r: number, g: number, b: number, a?: number) => string;
export declare const Color: {
    readonly black: string;
    readonly white: string;
    readonly red: string;
    readonly green: string;
    readonly blue: string;
    readonly yellow: string;
    readonly cyan: string;
    readonly magenta: string;
};
