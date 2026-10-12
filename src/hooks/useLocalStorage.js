import { useState, useEffect } from 'react'

export const useLocalStorage = (key, initialValue) => {
    // local state to manage the value in local storage; function initializer
    // that reads from local storage only runs once on mount
    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored !== null ? JSON.parse(stored) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // update local storage whenever the state value changes
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error writing localStorage key "${key}":`, error);
        }
    }, [key, value]);

    return [value, setValue];
};