export type ColorRGB = {
    r: number;
    g: number;
    b: number;
};
export type ColorRGBA = {
    a: number;
} & ColorRGB;
export type Color = ColorRGB & Partial<ColorRGBA>;
export type AnyColor = Color | string | [number, number, number] | [number, number, number, number];
export declare const Color: {
    readonly black: Color;
    readonly white: Color;
    readonly red: Color;
    readonly green: Color;
    readonly blue: Color;
    readonly yellow: Color;
    readonly cyan: Color;
    readonly magenta: Color;
    /**
     * Create `Color` from RGBA
     */
    readonly create: (r: number, g: number, b: number, a?: number) => Color;
    /**
     * Convert `Color` to canvas color
     */
    readonly convert: (color: Color) => string;
    /**
     * Create canvas color from RGBA
     */
    readonly from: (r: number, g: number, b: number, a?: number) => string;
    readonly mix: (a: ColorRGB, b: ColorRGB, t?: number) => ColorRGB;
    readonly alpha: (c: ColorRGB, a: number) => Color;
};
