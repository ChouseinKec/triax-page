// Types
import type { PseudoDefinition } from '@/src/page-builder/core/page/types/pseudo';
import type { ValidationResult } from '@/src/shared/types/result';

// Utilities
import { isPseudoNameValid, isPseudoValueValid } from '@/src/page-builder/core/page/utilities/pseudo';

/**
 * Type guard to check if a value is a valid PseudoDefinition shape
 */
function isDefinitionShape(value: unknown): value is Record<keyof PseudoDefinition, unknown> {
	return (
		typeof value === 'object' && //
		value !== null &&
		'name' in value &&
		'value' in value
	);
}

/**
 * Validates a PseudoDefinition object.
 */
export function validatePseudoDefinition(pseudo: unknown): ValidationResult {
	if (!pseudo) return { success: false, error: 'Pseudo definition is required' };

	if (!isDefinitionShape(pseudo)) return { success: false, error: `Pseudo definition must be an object with required properties, got: ${typeof pseudo}` };

	if (!isPseudoNameValid(pseudo.name)) return { success: false, error: `Pseudo definition requires a valid name, got: ${pseudo.name}` };

	if (!isPseudoValueValid(pseudo.value)) return { success: false, error: `Pseudo definition requires a valid value, got: ${pseudo.value}` };

	return { success: true };
}
