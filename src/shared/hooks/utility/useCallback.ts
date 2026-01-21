import { useCallback, useEffect, useRef } from "react";
import { devLog } from '@/shared/utilities/dev';

/**
 * A hook that wraps a function in a try...catch block to handle potential errors gracefully.
 *
 * @template T - The type of the arguments for the callback function.
 * @template R - The return type of the callback function.
 * @param callback - The function to be executed safely.
 * @param onError - A function to call when an exception is caught.
 * @returns A new function that will not throw, returning undefined on error.
 */
export const useSafeCallback = <T extends unknown[], R>(callback: ((...args: T) => R) | undefined, onError: (error: unknown) => void): ((...args: T) => R | undefined) => {
	return useCallback(
		(...args: T): R | undefined => {
			if (typeof callback !== 'function') {
				return undefined;
			}

			try {
				return callback(...args);
			} catch (error) {
				devLog.error('[useSafeCallback] An exception was caught:', error);
				onError(error);
				return undefined;
			}
		},
		[callback, onError]
	);
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
