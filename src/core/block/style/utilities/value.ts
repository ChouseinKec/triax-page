// Utilities
import { getTokenCanonical } from '@/src/core/block/style/utilities';
import { devLog } from '@/src/shared/utilities/dev';

// Types
import type { TokenTypeKey, TokenTypeDefinitionRecord, StyleValue } from '@/src/core/block/style/types';
import type { OptionDefinition } from '@/src/shared/components/types/option';

/**
 * Determines the type of a CSS value based on its format.
 * Uses registered token types ordered by priority.
 * @param input - The CSS value string to classify.
 */
export function getValueType(styleValue: StyleValue, tokenTypeDefinitions: TokenTypeDefinitionRecord): TokenTypeKey | undefined {
	const sortedTypes = Object.values(tokenTypeDefinitions).sort((a, b) => a.priority - b.priority);

	for (const typeDef of sortedTypes) {
		const valueType = typeDef.getValueType(styleValue);
		if (valueType) return valueType;
	}

	// Log unrecognized value for debugging
	return devLog.warn('Unrecognized CSS value type:', styleValue), undefined;
}

/**
 * Converts a CSS value string to its canonical token representation.
 * Converts keywords to their canonical form, numbers to '<number>', and dimensions to '<dimensionType>'.
 * If the value type is not recognized, returns undefined.
 * @param input - The CSS value string to convert.
 */
export function getValueToken(styleValue: StyleValue, tokenTypeDefinitions: TokenTypeDefinitionRecord): string | undefined {
	// Sort token types by priority
	const sortedTypes = Object.values(tokenTypeDefinitions).sort((a, b) => a.priority - b.priority);


	// Try to get the value token from each type definition
	for (const typeDef of sortedTypes) {
		const valueToken = typeDef.getValueToken(styleValue);

		if (valueToken) return valueToken;
	}

	// Fallback: return the canonical form
	return getTokenCanonical(styleValue, tokenTypeDefinitions);
}

/**
 * Converts an array of CSS value strings to an array of tokens.
 * Uses getValueToken to convert each value to its token representation.
 * Filters out any unrecognized values (returns null for those).
 * @param inputs - An array of CSS value strings to convert.
 */
export function getValueTokens(styleValues: StyleValue[], tokenTypeDefinitions: TokenTypeDefinitionRecord): string[] {
	return styleValues.map((styleValue) => getValueToken(styleValue, tokenTypeDefinitions)).filter((token): token is string => token !== undefined);
}

/**
 * Determines the default value type to use when a value is empty.
 * Prioritizes certain types (length > keyword > color > function) based on available options.
 * Falls back to the first option's type if no prioritized types are available.
 * @param options - Array of option definitions containing type information
 */
export function getValueDefaultType(options: OptionDefinition[]): TokenTypeKey | undefined {
	// Get all unique value types available in options (flatten in case of nested arrays)
	const allTypes = new Set(options.flat().map((option) => option.type as TokenTypeKey));

	// Prioritize certain types for better UX
	if (allTypes.has('length')) return 'length';
	if (allTypes.has('keyword')) return 'keyword';
	if (allTypes.has('color')) return 'color';
	if (allTypes.has('function')) return 'function';

	// Fallback to first option's type
	return options[0]?.type as TokenTypeKey;
}
