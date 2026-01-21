// Types
import type { AttributeContext } from '@/core/block/attribute/types';
import type { ContextResult } from '@/shared/types/result';

/**
 * Fetches the registries and constants for attribute context.
 */
function getRegistriesAndConstants(): ContextResult<AttributeContext> {
	return {
		success: true,
		data: {
			constant: {},
		},
	};
}

/**
 * Fetches the attribute context containing constants used in block attribute operations.
 */
export function fetchAttributeContext(): ContextResult<AttributeContext> {
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
 * Reactive hook to get the current attribute context for block attribute operations.
 */
export function useAttributeContext(): ContextResult<AttributeContext> {
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
