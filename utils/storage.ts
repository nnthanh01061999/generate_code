export const getStorage = (key: string) => localStorage.getStorage(key);

export const setStorage = (key: string, value: any) => localStorage.setStorage(key, value);

export const removeStorage = (key: string) => localStorage.removeStorage(key);

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
