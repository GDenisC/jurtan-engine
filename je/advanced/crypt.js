export const Crypt = {
    decodeBase64: (data) => {
        try {
            return atob(data);
        }
        catch (_a) {
            return data;
        }
    },
    encodeBase64: (data) => {
        try {
            return btoa(data);
        }
        catch (_a) {
            return data;
        }
    },
    reverse: (data) => data.split('').reverse().join('')
};
//# sourceMappingURL=crypt.js.map