// Types
import type { OptionDefinition } from '@/shared/components/types/option';
import type { UnitDefinitionRecord, RegisteredStyles, RegisteredTokens, RegisteredTokenTypes, TokenRaw, StyleKey, TokenCanonical } from '@/core/block/style/types';

// Utilities
import { getTokenType, getTokenCanonical, getTokenBase, getValueTokens } from '@/core/block/style/utilities';
import { devLog } from '@/shared/utilities/dev';

/**
 * Context object for option generation, reducing parameter passing.
 */
interface OptionGenerationContext {
	styleKey: StyleKey;
	tokenTypeDefinitions: RegisteredTokenTypes;
	tokenDefinitions: RegisteredTokens;
	styleDefinitions: RegisteredStyles;
	unitDefinitions: UnitDefinitionRecord;
	syntaxNormalized: string[];
	valueTokens: string[];
}

/**
 * Determines if a slot is beyond the current value length (extending the value).
 * @param slotIndex - The index of the slot
 * @param currentLength - The current number of tokens
 * @returns True if this slot would extend the current value
 */
function canExtendSlot(slotIndex: number, currentLength: number): boolean {
	return slotIndex >= currentLength;
}

/**
 * Validates if a token is valid for a slot by checking if it produces a valid syntax.
 * @param tokenCanonical - The canonical form of the token to validate
 * @param slotIndex - The index of the slot in the syntax
 * @param validVariations - Array of normalized valid syntax variations
 * @param currentTokens - Array of current canonical tokens for all slots
 * @returns True if the token produces a valid syntax, false otherwise
 */
function isValidTokenForSlot(tokenCanonical: TokenCanonical, slotIndex: number, validVariations: string[], currentTokens: string[]): boolean {
	const testTokens = [...currentTokens];
	testTokens[slotIndex] = tokenCanonical;

	const testString = testTokens
		.filter((t) => t)
		.join(' ')
		.trim();

	return validVariations.some((variation) => variation.startsWith(testString));
}

/**
 * Validates if a token is a valid option for a slot, considering current values and syntax.
 * @param tokenCanonical - The canonical form of the token to validate
 * @param slotIndex - The index of the slot in the syntax
 * @param validValueSet - Array of normalized valid value strings
 * @param currentTokens - Array of current canonical tokens for all slots
 * @returns True if the token is valid for the slot, false otherwise
 */
export function validateSlotOption(tokenCanonical: TokenCanonical, slotIndex: number, validValueSet: string[], currentTokens: string[]): boolean {
	// Always allow if the current value for this slot matches the candidate token
	if (currentTokens[slotIndex] === tokenCanonical) return true;

	// For slots beyond the current value length, allow any token to enable extending the value
	if (canExtendSlot(slotIndex, currentTokens.length)) return true;

	// Validate the token produces a valid syntax
	return isValidTokenForSlot(tokenCanonical, slotIndex, validValueSet, currentTokens);
}

/**
 * Creates option definitions for a token based on its type.
 * @param tokenRaw - The raw token string
 * @param tokenCanonical - The canonical form of the token (to avoid redundant lookups)
 * @param tokenBase - The base form of the token (to avoid redundant lookups)
 * @param context - Option generation context with required registries and state
 * @returns Option definition(s) or undefined if creation fails
 */
function createOptionWithContext(tokenRaw: TokenRaw, tokenCanonical: TokenCanonical, tokenBase: TokenRaw, context: OptionGenerationContext): OptionDefinition | OptionDefinition[] | undefined {
	// Determine the type of the token
	const tokenType = getTokenType(tokenRaw, context.tokenTypeDefinitions);
	if (!tokenType) return (devLog.warn(`Unable to determine token type for "${tokenRaw}" in style "${context.styleKey}"`), undefined);

	// Get the definition for this token type
	const tokenTypeDefinition = context.tokenTypeDefinitions[tokenType];
	if (!tokenTypeDefinition?.createOption) return (devLog.warn(`No option creation function for token type "${tokenType}" in style "${context.styleKey}"`), undefined);

	// Prepare parameters for the option creation function
	const params = {
		tokenDefinitions: context.tokenDefinitions,
		tokenTypeDefinitions: context.tokenTypeDefinitions,
		styleDefinitions: context.styleDefinitions,
		unitDefinitions: context.unitDefinitions,
		tokenRaw,
		tokenCanonical,
		tokenBase,
		styleKey: context.styleKey,
	};

	const createdOption = tokenTypeDefinition.createOption(params);
	if (!createdOption || (Array.isArray(createdOption) && createdOption.length === 0)) return (devLog.warn(`Option creation failed for token "${tokenRaw}" of type "${tokenType}" in style "${context.styleKey}"`), undefined);

	return createdOption;
}

/**
 * Creates option definitions for a token based on its type.
 * @param styleKey - The CSS property key for context
 * @param tokenRaw - The raw token string
 * @param tokenCanonical - The canonical form of the token (to avoid redundant lookups)
 * @param tokenBase - The base form of the token (to avoid redundant lookups)
 * @param tokenTypeDefinitions - Registry of token type definitions
 * @param tokenDefinitions - Registry of token definitions
 * @param styleDefinitions - Registry of style definitions
 * @param unitDefinitions - Registry of unit definitions
 * @returns Option definition(s) or undefined if creation fails
 */
export function createOption(styleKey: StyleKey, tokenRaw: TokenRaw, tokenCanonical: TokenCanonical, tokenBase: TokenRaw, tokenTypeDefinitions: RegisteredTokenTypes, tokenDefinitions: RegisteredTokens, styleDefinitions: RegisteredStyles, unitDefinitions: UnitDefinitionRecord): OptionDefinition | OptionDefinition[] | undefined {
	const context: OptionGenerationContext = {
		styleKey,
		tokenTypeDefinitions,
		tokenDefinitions,
		styleDefinitions,
		unitDefinitions,
		syntaxNormalized: [],
		valueTokens: [],
	};

	return createOptionWithContext(tokenRaw, tokenCanonical, tokenBase, context);
}

/**
 * Builds options for a single slot by processing its tokens.
 * Caches validation results to avoid redundant computations.
 * Uses context object to reduce parameter passing.
 * @param tokenSet - Set of tokens available for this slot
 * @param setIndex - Index of this slot
 * @param context - Option generation context with required registries and state
 * @returns Array of option definitions for the slot
 */
function createSlotOptionsWithContext(tokenSet: Set<string>, setIndex: number, context: OptionGenerationContext): OptionDefinition[] {
	// Cache for validation results to avoid redundant checks
	const validationCache = new Map<string, boolean>();

	// Initialize array to collect options for this slot
	const options: OptionDefinition[] = [];

	// Iterate over each token in the set
	for (const token of tokenSet) {
		// Cache canonical and base forms to avoid redundant lookups
		const tokenCanonical = getTokenCanonical(token, context.tokenTypeDefinitions);
		if (!tokenCanonical) {
			devLog.warn(`Failed to get canonical for token "${token}" in style "${context.styleKey}"`);
			continue;
		}

		const tokenBase = getTokenBase(token, context.tokenTypeDefinitions);
		if (!tokenBase) {
			devLog.warn(`Failed to get base for token "${token}" in style "${context.styleKey}"`);
			continue;
		}

		// Check validation cache to avoid redundant validation
		let isValid = validationCache.get(tokenCanonical);
		if (isValid === undefined) {
			// Validate if this token is allowed for the slot
			isValid = validateSlotOption(tokenCanonical, setIndex, context.syntaxNormalized, context.valueTokens);
			validationCache.set(tokenCanonical, isValid);
		}

		if (!isValid) continue;

		// Create option(s) for the token (pass cached forms to avoid redundant lookups)
		const option = createOption(context.styleKey, token, tokenCanonical, tokenBase, context.tokenTypeDefinitions, context.tokenDefinitions, context.styleDefinitions, context.unitDefinitions);

		// Add to options array if created successfully
		if (option) options.push(...(Array.isArray(option) ? option : [option]));
	}

	// Return the collected options
	return options;
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
	const context: OptionGenerationContext = {
		styleKey,
		tokenTypeDefinitions,
		tokenDefinitions,
		styleDefinitions,
		unitDefinitions,
		syntaxNormalized,
		valueTokens,
	};

	return createSlotOptionsWithContext(tokenSet, setIndex, context);
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
