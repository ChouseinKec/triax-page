"use client";

import { useEffect, useState, useRef, useCallback } from "react";

/**
 * A custom hook that debounces a value, delaying its update until a specified time has passed
 * without further changes. 
 *
 * @param {string} inputValue - The value to debounce.
 * @param {number} delay - The delay (in milliseconds) before updating the debounced value.
 * @returns {string} - The debounced value, updated only after the delay has passed.
 */
export const useDebouncedValue = (inputValue: string | number, delay: number): string | number => {
    const [debouncedValue, setDebouncedValue] = useState(inputValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, delay);

        return () => { clearTimeout(handler); };
    }, [inputValue, delay]);

    return debouncedValue;
};


/**
 * A custom hook that debounces a callback function.
 *
 * @param callback - The callback function to debounce.
 * @param delay - The delay in milliseconds before the callback is executed.
 * @returns A debounced version of the callback function.
 */
export function useDebouncedCallback<T extends (...args: never[]) => void>(callback: T, delay: number): (...args: Parameters<T>) => void {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Cleanup the timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Create the debounced callback
    const debouncedCallback = useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );

    return debouncedCallback;
}

