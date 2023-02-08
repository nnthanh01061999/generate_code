import { setCookie as setCookieLib, getCookie as getCookieLib, removeCookies as removeCookiesLib } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';

export const getCookie = (key: string, options?: OptionsType) => getCookieLib(key, options);

export const setCookie = (key: string, value: any, options?: OptionsType) => setCookieLib(key, value, options);

export const removeCookie = (key: string, options?: OptionsType) => removeCookiesLib(key, options);

export const getCookieJson = (key: string, options?: OptionsType) => {
    const value = getCookie(key, options) as string;
    try {
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
};

export const setCookieJson = (key: string, value: any, options?: OptionsType) => setCookie(key, JSON.stringify(value), options);
