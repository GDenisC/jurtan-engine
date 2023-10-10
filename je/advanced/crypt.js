export const Crypt = {
    decodeBase64: (data) => {
        return new TextDecoder().decode(atob(data));
    },
    encodeBase64: (data) => {
        return btoa(new TextEncoder().encode(data));
    },
    reverse: (data) => data.split('').reverse().join('')
};
//# sourceMappingURL=crypt.js.map