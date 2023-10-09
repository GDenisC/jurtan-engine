export const Color = {
    black: { r: 0, g: 0, b: 0 },
    white: { r: 255, g: 255, b: 255 },
    red: { r: 255, g: 0, b: 0 },
    green: { r: 0, g: 255, b: 0 },
    blue: { r: 0, g: 0, b: 255 },
    yellow: { r: 255, g: 255, b: 0 },
    cyan: { r: 0, g: 255, b: 255 },
    magenta: { r: 255, g: 0, b: 255 },
    /**
     * Create `Color` from RGBA
     */
    create: (r, g, b, a) => ({ r, g, b, a }),
    /**
     * Convert `Color` to canvas color
     */
    convert: (color) => color.a ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` : `rgb(${color.r}, ${color.g}, ${color.b})`,
    /**
     * Create canvas color from RGBA
     */
    from: (r, g, b, a) => Color.convert(Color.create(r, g, b, a)),
    mix: (a, b, t = 0.5) => {
        if (t == 1)
            return a;
        if (t == 0)
            return b;
        return Color.create(a.r * (1 - t) + b.r * t, a.g * (1 - t) + b.g * t, a.b * (1 - t) + b.b * t);
    },
    alpha: (c, a) => Color.create(c.r, c.g, c.b, a),
};
//# sourceMappingURL=colors.js.map