export type ColorRGB = {
    r: number,
    g: number,
    b: number
}

export type ColorRGBA = { a: number } & ColorRGB;

export type Color = ColorRGB & Partial<ColorRGBA>;

export type AnyColor = Color | string | [number, number, number] | [number, number, number, number];

export const Color = {
    black: { r: 0, g: 0, b: 0 } as Color,
    white: { r: 255, g: 255, b: 255 } as Color,
    red: { r: 255, g: 0, b: 0 } as Color,
    green: { r: 0, g: 255, b: 0 } as Color,
    blue: { r: 0, g: 0, b: 255 } as Color,
    yellow: { r: 255, g: 255, b: 0 } as Color,
    cyan: { r: 0, g: 255, b: 255 } as Color,
    magenta: { r: 255, g: 0, b: 255 } as Color,

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
    },
    alpha: (c: ColorRGB, a: number) => Color.create(c.r, c.g, c.b, a),
} as const;