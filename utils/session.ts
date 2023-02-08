export const getSession = (key: string) => sessionStorage.getItem(key);

export const setSession = (key: string, value: any) => sessionStorage.setItem(key, value);

export const removeSession = (key: string) => sessionStorage.removeItem(key);

export const clearAllSession = () => sessionStorage.clear();

export const getSessionJson = (key: string) => {
    const value = getSession(key);
    try {
        return value ? JSON.parse(value) : undefined;
    } catch (error) {
        return value;
    }
};

export const setSessionJson = (key: string, value: any) => setSession(key, JSON.stringify(value));
