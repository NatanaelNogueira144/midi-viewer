'use client';
import { useCallback } from 'react';

export default function useLocalStorage() {
    const get = useCallback((key: string): unknown => {
        const localValue = window?.localStorage?.getItem(key);
        return localValue ? JSON.parse(localValue) : null;
    }, []);

    const remove = useCallback((key: string): void => {
        window?.localStorage?.removeItem(key);
    }, []);

    const set = useCallback((key: string, value: unknown): void => {
        window?.localStorage?.setItem(key, JSON.stringify(value));
    }, []);

    return { get, set, remove };
}