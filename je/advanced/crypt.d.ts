export declare const Crypt: {
    readonly decodeBase64: (data: string) => string;
    readonly encodeBase64: (data: string) => string;
    readonly reverse: (data: string) => string;
    /**
     * Encodes data from 8 bit to 16 bit
     */
    readonly from8To16: (data: string) => string;
    /**
     * Encodes data from 16 bit to 8 bit
     */
    readonly from16To8: (data: string) => string;
};
