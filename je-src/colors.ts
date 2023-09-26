export type ColorRGB = {
    r: number,
    g: number,
    b: number
}

export type ColorRGBA = { a: number } & ColorRGB;

export type Color = ColorRGB & Partial<ColorRGBA>;

export const createColor = (r: number, g: number, b: number, a?: number): Color => ({ r, g, b, a });
export const toCanvasColor = (color: Color) => (color.a ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` : `rgb(${color.r}, ${color.g}, ${color.b})`);
export const newColor = (r: number, g: number, b: number, a?: number) => toCanvasColor(createColor(r, g, b, a));

export const Color = {
    black: newColor(0, 0, 0),
    white: newColor(255, 255, 255),
    red: newColor(255, 0, 0),
    green: newColor(0, 255, 0),
    blue: newColor(0, 0, 255),
    yellow: newColor(255, 255, 0),
    cyan: newColor(0, 255, 255),
    magenta: newColor(255, 0, 255)
} as const;