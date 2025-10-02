// Types
import type { PseudoDefinition, PseudoID, PseudoName, PseudoValue } from '@/src/page-builder/core/page/types/pseudo';

/**
 * Validates that a pseudo name is valid
 */
export function isPseudoNameValid(pseudoName: unknown): pseudoName is PseudoName {
	return typeof pseudoName === 'string' && pseudoName.length > 0;
}

/**
 * Validates that a pseudo value is valid
 */
export function isPseudoValueValid(pseudoValue: unknown): pseudoValue is PseudoValue {
	return typeof pseudoValue === 'string' && pseudoValue.length > 0;
}

export function isPseudoIDValid(pseudoID: unknown): pseudoID is PseudoID {
	return typeof pseudoID === 'string' && pseudoID.length > 0;
}

/**
 * Type guard to check if a value is a valid PseudoDefinition shape
 */
export function isPseudoDefinitionValid(pseudoDefinition: unknown): pseudoDefinition is Record<keyof PseudoDefinition, unknown> {
	return (
		typeof pseudoDefinition === 'object' && //
		pseudoDefinition !== null &&
		'name' in pseudoDefinition &&
		'value' in pseudoDefinition
	);
}
