export declare class CryptWriter {
    protected buffer: ArrayBuffer;
    protected view: DataView;
    index: number;
    constructor(length: number);
    writeUint8(value: number): void;
    writeUint16(value: number): void;
    writeUint32(value: number): void;
    writeInt8(value: number): void;
    writeInt16(value: number): void;
    writeInt32(value: number): void;
    writeFloat32(value: number): void;
    writeFloat64(value: number): void;
    writeString8(value: string): void;
    writeString16(value: string): void;
    writeString32(value: string): void;
    write(): Uint8Array;
    getBuffer(): ArrayBuffer;
}
export declare class CryptReader {
    protected buffer: ArrayBuffer;
    protected view: DataView;
    index: number;
    constructor(buffer: ArrayBuffer);
    readUint8(): number;
    readUint16(): number;
    readUint32(): number;
    readInt8(): number;
    readInt16(): number;
    readInt32(): number;
    readFloat32(): number;
    readFloat64(): number;
    readString8(): string;
    readString16(): string;
    readString32(): string;
}
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
