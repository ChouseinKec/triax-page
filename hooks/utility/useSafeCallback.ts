import { useCallback } from 'react';
import { devLog } from '@/utilities/dev';

/**
 * A hook that wraps a function in a try...catch block to handle potential errors gracefully.
 *
 * @template T - The type of the arguments for the callback function.
 * @template R - The return type of the callback function.
 * @param {(...args: T) => R} callback - The function to be executed safely.
 * @param {(error: unknown) => void} onError - A function to call when an exception is caught.
 * @returns {(...args: T) => R | undefined} A new function that will not throw, returning undefined on error.
 */
export const useSafeCallback = <T extends any[], R>(callback: ((...args: T) => R) | undefined, onError: (error: unknown) => void): ((...args: T) => R | undefined) => {
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
