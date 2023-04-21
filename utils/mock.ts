export const mockApi = (success: boolean, timeout = 1000): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve();
            } else {
                reject({ message: 'Error' });
            }
        }, timeout);
    });
};
