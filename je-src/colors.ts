export type ColorRGB = {
    r: number,
    g: number,
    b: number
}

export type ColorRGBA = { a: number } & ColorRGB;

export type Color = ColorRGB & Partial<ColorRGBA>;

export const Color = {
    black: 'black',
    white: 'white',
    red: 'red',
    green: 'green',
    blue: 'blue',
    yellow: 'yellow',
    cyan: 'cyan',
    magenta: 'magenta',

    /**
     * Create `Color` from RGBA
     */
    create: (r: number, g: number, b: number, a?: number): Color => ({ r, g, b, a }),
    /**
     * Convert `Color` to canvas color
     */
    convert: (color: Color) => color.a ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` : `rgb(${color.r}, ${color.g}, ${color.b})`,
    /**
     * Create canvas color from RGBA
     */
    from: (r: number, g: number, b: number, a?: number) => Color.convert(Color.create(r, g, b, a)),
    mix: (a: ColorRGB, b: ColorRGB, t: number = 0.5) => {
        if (t == 1) return a;
        if (t == 0) return b;

        return Color.create(
            a.r * (1 - t) + b.r * t,
            a.g * (1 - t) + b.g * t,
            a.b * (1 - t) + b.b * t
        );
    }
} as const;