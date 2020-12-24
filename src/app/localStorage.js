const STORAGE_KEY = '__dutch';

export const readState = () => {
    try {
        const serializedState = window.localStorage.getItem(STORAGE_KEY);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const writeState = state => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const resetStorage = () => {
    window.localStorage.removeItem(STORAGE_KEY);
};
