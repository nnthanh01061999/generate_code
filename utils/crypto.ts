import CryptoJS from 'crypto-js';

class Crypto {
    encrypt(t: string, p: string): string {
        const md5 = this.encode(p);
        const result = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(t), CryptoJS.enc.Utf8.parse(md5), {
            keySize: 128 / 8,
            iv: CryptoJS.enc.Utf8.parse(md5.toString().substring(0, 16)),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        return result.toString();
    }

    decrypt(t: string, p: string): string {
        const md5 = this.encode(p);
        const result = CryptoJS.AES.decrypt(t, CryptoJS.enc.Utf8.parse(md5), {
            keySize: 128 / 8,
            iv: CryptoJS.enc.Utf8.parse(md5.toString().substring(0, 16)),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        return result.toString(CryptoJS.enc.Utf8);
    }

    encode(t: string): string {
        return CryptoJS.MD5(t).toString();
    }

    encUTF8(): any {
        return CryptoJS.enc.Utf8;
    }
}

export const crypto = new Crypto();
