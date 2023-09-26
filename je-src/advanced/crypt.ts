export const Crypt = {
    decodeBase64: (data: string) => {
        try {
            return atob(data);
        } catch {
            return data;
        }
    },
    encodeBase64: (data: string) => {
        try {
            return btoa(data);
        } catch {
            return data;
        }
    },
    reverse: (data: string) => data.split('').reverse().join('')
} as const;