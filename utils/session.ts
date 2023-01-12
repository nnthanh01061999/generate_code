export const getSession = (key: string) => sessionStorage.getSession(key);

export const setSession = (key: string, value: any) => sessionStorage.setSession(key, value);

export const removeSession = (key: string) => sessionStorage.removeSession(key);

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
