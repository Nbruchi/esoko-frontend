export const storage = {
    get: <T>(key: string): T | null => {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(`Error reading from session storage: ${error}`);
            return null;
        }
    },

    set: <T>(key: string, value: T): void => {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error writing to session storage: ${error}`);
        }
    },

    remove: (key: string): void => {
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing from session storage: ${error}`);
        }
    },

    clear: (): void => {
        try {
            sessionStorage.clear();
        } catch (error) {
            console.error(`Error clearing session storage: ${error}`);
        }
    },
};
