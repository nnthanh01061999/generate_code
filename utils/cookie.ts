import { setCookie as setCookieLib, getCookie as getCookieLib, removeCookies as removeCookiesLib } from 'cookies-next';

export const getCookie = (key: string) => getCookieLib(key);

export const setCookie = (key: string, value: any) => setCookieLib(key, value);

export const removeCookie = (key: string) => removeCookiesLib(key);

export const getCookieJson = (key: string) => {
    const value = getCookie(key) as string;
    try {
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
};

export const setCookieJson = (key: string, value: any) => setCookie(key, JSON.stringify(value));
