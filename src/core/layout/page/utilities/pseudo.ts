// Types
import type { PseudoDefinition, PseudoID, PseudoName, PseudoValue } from '@/src/core/layout/page/types';

/**
 * Validates if a value is a valid pseudo state name.
 * Checks if the value is a non-empty string.
 * @param pseudoName - The value to validate
 * @returns True if valid PseudoName, false otherwise
 * @example
 * isPseudoNameValid('hover') → true
 * isPseudoNameValid('') → false
 */
export function isPseudoNameValid(pseudoName: unknown): pseudoName is PseudoName {
	return typeof pseudoName === 'string' && pseudoName.length > 0;
}

/**
 * Validates if a value is a valid pseudo state value identifier.
 * Checks if the value is a non-empty string.
 * @param pseudoValue - The value to validate
 * @returns True if valid PseudoValue, false otherwise
 * @example
 * isPseudoValueValid('active') → true
 */
export function isPseudoValueValid(pseudoValue: unknown): pseudoValue is PseudoValue {
	return typeof pseudoValue === 'string' && pseudoValue.length > 0;
}

/**
 * Validates if a value is a valid pseudo state identifier.
 * Checks if the value is a non-empty string.
 * @param pseudoID - The value to validate
 * @returns True if valid PseudoID, false otherwise
 * @example
 * isPseudoIDValid('hover') → true
 */
export function isPseudoIDValid(pseudoID: unknown): pseudoID is PseudoID {
	return typeof pseudoID === 'string' && pseudoID.length > 0;
}

/**
 * Validates if a value is a valid pseudo state definition.
 * Checks if the value is an object with all required pseudo properties.
 * @param pseudoDefinition - The value to validate
 * @returns True if valid PseudoDefinition shape, false otherwise
 * @example
 * isPseudoDefinitionValid({ name: 'Hover', value: 'hover' }) → true
 */
export function isPseudoDefinitionValid(pseudoDefinition: unknown): pseudoDefinition is Record<keyof PseudoDefinition, unknown> {
	return (
		typeof pseudoDefinition === 'object' && //
		pseudoDefinition !== null &&
		'name' in pseudoDefinition &&
		'value' in pseudoDefinition
	);
}
