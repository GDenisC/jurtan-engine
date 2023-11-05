export class CryptWriter {
    constructor(length) {
        this.index = 0;
        this.buffer = new ArrayBuffer(length);
        this.view = new DataView(this.buffer);
    }
    writeUint8(value) {
        this.view.setUint8(this.index, value);
        this.index += 1;
    }
    writeUint16(value) {
        this.view.setUint16(this.index, value);
        this.index += 2;
    }
    writeUint32(value) {
        this.view.setUint32(this.index, value);
        this.index += 4;
    }
    writeInt8(value) {
        this.view.setInt8(this.index, value);
        this.index += 1;
    }
    writeInt16(value) {
        this.view.setInt16(this.index, value);
        this.index += 2;
    }
    writeInt32(value) {
        this.view.setInt32(this.index, value);
        this.index += 4;
    }
    writeFloat32(value) {
        this.view.setFloat32(this.index, value);
        this.index += 4;
    }
    writeFloat64(value) {
        this.view.setFloat64(this.index, value);
        this.index += 8;
    }
    writeString8(value) {
        this.writeUint8(value.length);
        for (let i = 0; i < value.length; ++i) {
            this.writeUint8(value.charCodeAt(i));
        }
    }
    writeString16(value) {
        this.writeUint8(value.length);
        for (let i = 0; i < value.length; ++i) {
            this.writeUint16(value.charCodeAt(i));
        }
    }
    writeString32(value) {
        this.writeUint8(value.length);
        for (let i = 0; i < value.length; ++i) {
            this.writeUint32(value.charCodeAt(i));
        }
    }
    write() {
        return new Uint8Array(this.buffer);
    }
    getBuffer() {
        return this.buffer;
    }
}
export class CryptReader {
    constructor(buffer) {
        this.buffer = buffer;
        this.index = 0;
        this.view = new DataView(this.buffer);
    }
    readUint8() {
        const value = this.view.getUint8(this.index);
        this.index += 1;
        return value;
    }
    readUint16() {
        const value = this.view.getUint16(this.index);
        this.index += 2;
        return value;
    }
    readUint32() {
        const value = this.view.getUint32(this.index);
        this.index += 4;
        return value;
    }
    readInt8() {
        const value = this.view.getInt8(this.index);
        this.index += 1;
        return value;
    }
    readInt16() {
        const value = this.view.getInt16(this.index);
        this.index += 2;
        return value;
    }
    readInt32() {
        const value = this.view.getInt32(this.index);
        this.index += 4;
        return value;
    }
    readFloat32() {
        const value = this.view.getFloat32(this.index);
        this.index += 4;
        return value;
    }
    readFloat64() {
        const value = this.view.getFloat64(this.index);
        this.index += 8;
        return value;
    }
    readString8() {
        const length = this.readUint8();
        let value = '';
        for (let i = 0; i < length; ++i) {
            value += String.fromCharCode(this.readUint8());
        }
        return value;
    }
    readString16() {
        const length = this.readUint8();
        let value = '';
        for (let i = 0; i < length; ++i) {
            value += String.fromCharCode(this.readUint16());
        }
        return value;
    }
    readString32() {
        const length = this.readUint8();
        let value = '';
        for (let i = 0; i < length; ++i) {
            value += String.fromCharCode(this.readUint32());
        }
        return value;
    }
}
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