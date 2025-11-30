// Types
import type { StyleContext } from 'src/core/block/style/types';
import type { ContextResult } from '@/src/shared/types/result';

// Managers
import { getStyleShorthands } from '@/src/core/block/style/manager/queries';

/**
 * Fetches the registries and constants for style context.
 */
function getRegistriesAndConstants(): ContextResult<StyleContext> {
	// Fetch constants
	const shorthands = getStyleShorthands();
	if (!shorthands) return { success: false, error: 'Failed to fetch style context constants.' };

	return {
		success: true,
		data: {
			constant: {
				shorthands,
			},
		},
	};
}

/**
 * Fetches the style context containing constants used in block style operations.
 */
export function fetchStyleContext(): ContextResult<StyleContext> {
	// Fetch registries and constants
	const registriesAndConstants = getRegistriesAndConstants();
	if (!registriesAndConstants.success) return registriesAndConstants;

	return {
		success: true,
		data: {
			constant: {
				...registriesAndConstants.data.constant,
			},
		},
	};
}

/**
 * Reactive hook to get the current style context for block style operations.
 */
export function useStyleContext(): ContextResult<StyleContext> {
	// Fetch registries and constants
	const registriesAndConstants = getRegistriesAndConstants();
	if (!registriesAndConstants.success) return registriesAndConstants;

	return {
		success: true,
		data: {
			constant: {
				...registriesAndConstants.data.constant,
			},
		},
	};
}
