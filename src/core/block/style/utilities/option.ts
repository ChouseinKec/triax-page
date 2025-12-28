// Types
import type { OptionDefinition } from '@/src/shared/components/types/option';
import type { TokenTypeDefinitionRecord } from '@/src/core/block/style/types';

// Utilities
import { getTokenType, getTokenCanonical, getValueTokens } from '@/src/core/block/style/utilities';

/**
 * Checks if a token is a valid option for a given slot, given the current values and all valid variations.
 *
 * @param token - The candidate token for the slot (e.g., 'auto', '<number>')
 * @param slotIndex - The index of the slot being checked
 * @param validValueSet - Set of all valid value strings (normalized)
 * @param currentTokens - The current value tokens for all slots (canonicalized)
 */
export function isSlotOptionValid(token: string, slotIndex: number, validValueSet: string[], currentTokens: string[]): boolean {
	const tokenCanonical = getTokenCanonical(token);
	if (!tokenCanonical) return false;

	// Always allow if the current value for this slot matches the candidate token
	if (currentTokens[slotIndex] === tokenCanonical) return true;

	// Replace only the relevant slot and check validity
	const testTokens = currentTokens.slice();
	testTokens[slotIndex] = tokenCanonical;
	const testString = testTokens.join(' ').trim();
	const matches = validValueSet.find((value) => value.startsWith(testString));

	if (!matches) return false;
	return true;
}

/**
 * Creates an StyleOptionDefinition object (or array) for a given token, using the correct factory based on type.
 *
 * @param token - The token string (e.g., 'auto', '<number>', '<length>', 'fit-content(...)')
 * @param styleKey - The name of the CSS property being edited (for keyword options)
 */
export function createOption(token: string, registeredTokenTypes: TokenTypeDefinitionRecord): OptionDefinition | OptionDefinition[] | undefined {
	const tokenType = getTokenType(token, registeredTokenTypes);
	if (!tokenType) return undefined;

	const tokenDefinition = registeredTokenTypes[tokenType];
	if (!tokenDefinition) return undefined;

	return tokenDefinition.createOption(token);
}

/**
 * Builds a 2D options table for slot-based value editors.
 * Each slot (column) contains only the valid options for the current context.
 *
 * @param syntaxNormalized - All valid variations, normalized and joined as strings
 * @param slotTokenSets - Array of arrays, each containing all possible tokens for that slot
 * @param values - The current value tokens for all slots (user input, not yet canonicalized)
 * @param styleKey - The name of the CSS property being edited (for keyword options)
 */
export function createOptionTable(syntaxNormalized: string[], syntaxSet: Set<string>[], values: string[], registeredTokenTypes: TokenTypeDefinitionRecord): OptionDefinition[][] {
	// Normalize the current values to canonical tokens
	const valueTokens = getValueTokens(values, registeredTokenTypes);

	// Build the options table for each slot
	return syntaxSet.map((tokenSet, setIndex) => {
		if (!tokenSet || tokenSet.size === 0) return [];

		// Use flatMap for concise option flattening
		return [...tokenSet].flatMap((token) => {
			const tokenCanonical = getTokenCanonical(token);
			if (!tokenCanonical) return [];

			// If the token matches the current value for this slot, or is a valid option
			// for this slot in the context of the current values, create the option
			if (isSlotOptionValid(token, setIndex, syntaxNormalized, valueTokens)) {
				const option = createOption(token, registeredTokenTypes);
				return Array.isArray(option) ? option : option ? [option] : [];
			}
			return [];
		});
	});
}
