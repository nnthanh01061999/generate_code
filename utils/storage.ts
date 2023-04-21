import { APP_PREFIX } from '@/data';

export const getStorage = (key: string) => localStorage.getItem(`${APP_PREFIX}${key}`);

export const setStorage = (key: string, value: any) => localStorage.setItem(`${APP_PREFIX}${key}`, value);

export const removeStorage = (key: string) => localStorage.removeItem(`${APP_PREFIX}${key}`);

export const clearAllStorage = () => localStorage.clear();

export const getStorageJson = (key: string) => {
    const value = getStorage(key);
    try {
        return value ? JSON.parse(value) : undefined;
    } catch (error) {
        return value;
    }
};

export const setStorageJson = (key: string, value: any) => setStorage(key, JSON.stringify(value));
