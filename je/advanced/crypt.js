export const Crypt = {
    decodeBase64: (data) => Crypt.from8To16(atob(data)),
    encodeBase64: (data) => btoa(Crypt.from16To8(data)),
    reverse: (data) => data.split('').reverse().join(''),
    /**
     * Encodes data from 8 bit to 16 bit
     */
    from8To16: (data) => {
        const bytes = new Uint8Array(data.length);
        for (let i = 0; i < data.length; ++i) {
            bytes[i] = data.charCodeAt(i);
        }
        return String.fromCharCode(...new Uint16Array(bytes.buffer));
    },
    /**
     * Encodes data from 16 bit to 8 bit
     */
    from16To8: (data) => {
        const bytes = new Uint16Array(data.length);
        for (let i = 0; i < data.length; ++i) {
            bytes[i] = data.charCodeAt(i);
        }
        return String.fromCharCode(...new Uint8Array(bytes.buffer));
    }
};
//# sourceMappingURL=crypt.js.map