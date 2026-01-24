// Types
import type { OptionDefinition } from '@/shared/components/types/option';
import type { UnitDefinitionRecord, RegisteredStyles, RegisteredTokens, RegisteredTokenTypes, TokenRaw, StyleKey, TokenCanonical } from '@/core/block/style/types';

// Utilities
import { getTokenType, getTokenCanonical, getTokenBase, getValueTokens } from '@/core/block/style/utilities';
import { devLog } from '@/shared/utilities/dev';

/**
 * Validates if a token is a valid option for a slot, considering current values and syntax.
 * @param tokenCanonical - The canonical form of the token to validate
 * @param slotIndex - The index of the slot in the syntax
 * @param validValueSet - Array of normalized valid value strings
 * @param currentTokens - Array of current canonical tokens for all slots
 * @param syntaxSet - Array of sets containing possible tokens for each slot
 * @returns True if the token is valid for the slot, false otherwise
 */
export function validateSlotOption(tokenCanonical: TokenCanonical, slotIndex: number, validValueSet: string[], currentTokens: string[]): boolean {


	// Always allow if the current value for this slot matches the candidate token
	if (currentTokens[slotIndex] === tokenCanonical) return true;

	// For slots beyond the current value length, allow any token to enable extending the value
	// if (slotIndex >= currentTokens.length) return true;

	// Replace only the relevant slot and check validity
	const testTokens = [...currentTokens];
	testTokens[slotIndex] = tokenCanonical;

	const testString = testTokens
		.filter((t) => t)
		.join(' ')
		.trim();
	const matches = validValueSet.find((value) => value.startsWith(testString));

	if (!matches) return false;
	return true;
}

/**
 * Creates option definitions for a token based on its type.
 * @param styleKey - The CSS property key for context
 * @param tokenRaw - The raw token string
 * @param tokenTypeDefinitions - Registry of token type definitions
 * @param tokenDefinitions - Registry of token definitions
 * @param styleDefinitions - Registry of style definitions
 * @param unitDefinitions - Registry of unit definitions
 * @returns Option definition(s) or undefined if creation fails
 */
export function createOption(styleKey: StyleKey, tokenRaw: TokenRaw, tokenTypeDefinitions: RegisteredTokenTypes, tokenDefinitions: RegisteredTokens, styleDefinitions: RegisteredStyles, unitDefinitions: UnitDefinitionRecord): OptionDefinition | OptionDefinition[] | undefined {
	// Determine the type of the token
	const tokenType = getTokenType(tokenRaw, tokenTypeDefinitions);
	if (!tokenType) return devLog.warn(`Unable to determine token type for "${tokenRaw}" in style "${styleKey}"`), undefined;

	// Get the definition for this token type
	const tokenTypeDefinition = tokenTypeDefinitions[tokenType];
	if (!tokenTypeDefinition?.createOption) return devLog.warn(`No option creation function for token type "${tokenType}" in style "${styleKey}"`), undefined;

	// Get the canonical form of the token
	const tokenCanonical = getTokenCanonical(tokenRaw, tokenTypeDefinitions);
	if (!tokenCanonical) return devLog.warn(`Unable to determine canonical form for token "${tokenRaw}" in style "${styleKey}"`), undefined;

	// Get the base form of the token
	const tokenBase = getTokenBase(tokenRaw, tokenTypeDefinitions);
	if (!tokenBase) return devLog.warn(`Unable to determine base form for token "${tokenRaw}" in style "${styleKey}"`), undefined;
	// Prepare parameters for the option creation function
	const params = {
		tokenDefinitions,
		tokenTypeDefinitions,
		styleDefinitions,
		unitDefinitions,
		tokenRaw,
		tokenCanonical,
		tokenBase,
		styleKey,
	};

	const createdOption = tokenTypeDefinition.createOption(params);
	if (!createdOption || (Array.isArray(createdOption) && createdOption.length === 0)) return devLog.warn(`Option creation failed for token "${tokenRaw}" of type "${tokenType}" in style "${styleKey}"`), undefined;

	return createdOption;
}

/**
 * Builds options for a single slot by processing its tokens.
 * @param tokenSet - Set of tokens available for this slot
 * @param setIndex - Index of this slot
 * @param syntaxNormalized - Normalized valid syntax variations
 * @param valueTokens - Current canonical tokens
 * @param tokenTypeDefinitions - Registry of token type definitions
 * @param styleKey - CSS property key
 * @param tokenDefinitions - Registry of token definitions
 * @param styleDefinitions - Registry of style definitions
 * @param unitDefinitions - Registry of unit definitions
 * @param syntaxSet - Array of token sets for all slots
 * @returns Array of option definitions for the slot
 */
export function createSlotOptions(tokenSet: Set<string>, setIndex: number, syntaxNormalized: string[], valueTokens: string[], tokenTypeDefinitions: RegisteredTokenTypes, styleKey: StyleKey, tokenDefinitions: RegisteredTokens, styleDefinitions: RegisteredStyles, unitDefinitions: UnitDefinitionRecord, syntaxSet: Set<string>[]): OptionDefinition[] {
	// Initialize array to collect options for this slot
	const options: OptionDefinition[] = [];

	// Iterate over each token in the set
	for (const token of tokenSet) {
		// Get canonical form; skip if not available
		const tokenCanonical = getTokenCanonical(token, tokenTypeDefinitions);
		if (!tokenCanonical) {
			devLog.warn(`Failed to get canonical for token "${token}" in style "${styleKey}"`);
			continue;
		}

		// Validate if this token is allowed for the slot
		if (!validateSlotOption(tokenCanonical, setIndex, syntaxNormalized, valueTokens)) continue;

		// Create option(s) for the token
		const option = createOption(styleKey, token, tokenTypeDefinitions, tokenDefinitions, styleDefinitions, unitDefinitions);

		// Add to options array if created successfully
		if (option) options.push(...(Array.isArray(option) ? option : [option]));
	}

	// Return the collected options
	return options;
}

/**
 * Builds a 2D options table for slot-based editing, returning undefined if any slot has no options.
 * @param styleKey - CSS property key
 * @param syntaxNormalized - Normalized syntax variations
 * @param syntaxSet - Array of token sets per slot
 * @param values - Current raw values
 * @param tokenTypeDefinitions - Registry of token type definitions
 * @param tokenDefinitions - Registry of token definitions
 * @param styleDefinitions - Registry of style definitions
 * @param unitDefinitions - Registry of unit definitions
 * @returns 2D array of options or undefined if invalid
 */
export function createOptionTable(styleKey: StyleKey, syntaxNormalized: string[], syntaxSet: Set<string>[], values: string[], tokenTypeDefinitions: RegisteredTokenTypes, tokenDefinitions: RegisteredTokens, styleDefinitions: RegisteredStyles, unitDefinitions: UnitDefinitionRecord): OptionDefinition[][] | undefined {
	// Convert raw values to canonical tokens
	const valueTokens = getValueTokens(values, tokenTypeDefinitions);

	// Build options for each slot
	const result = syntaxSet.map((tokenSet, setIndex) => createSlotOptions(tokenSet, setIndex, syntaxNormalized, valueTokens, tokenTypeDefinitions, styleKey, tokenDefinitions, styleDefinitions, unitDefinitions, syntaxSet));

	// Ensure all slots have options; return undefined if any are empty
	if (result.some((slot) => slot.length === 0)) return undefined;

	// Return the complete table
	return result;
}
