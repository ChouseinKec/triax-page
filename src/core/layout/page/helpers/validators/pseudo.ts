// Types
import type { PseudoDefinition, PseudoKey, PseudoName } from '@/src/core/layout/page/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { validateString, validateObject } from '@/src/shared/helpers';

/**
 * Validates a pseudo ID for pseudo operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param pseudoKey - The pseudo ID to validate
 */
export function validatePseudoKey(pseudoKey: unknown): ValidateResult<PseudoKey> {
	const stringValidation = validateString(pseudoKey);
	if (!stringValidation.valid) return { valid: false, message: `Pseudo ID must be a valid string, got: ${pseudoKey}` };

	return { valid: true, value: pseudoKey as PseudoKey };
}

/**
 * Validates a pseudo name for pseudo operations.
 * Checks if the name is a valid string.
 *
 * @param pseudoName - The pseudo name to validate
 */
export function validatePseudoName(pseudoName: unknown): ValidateResult<PseudoName> {
	const stringValidation = validateString(pseudoName);
	if (!stringValidation.valid) return { valid: false, message: `Pseudo name must be a valid string, got: ${pseudoName}` };

	return { valid: true, value: pseudoName as PseudoName };
}


/**
 * Validates a complete pseudo definition for pseudo operations.
 * Checks if the definition has all required valid properties including name and value.
 *
 * @param pseudoDefinition - The pseudo definition to validate
 */
export function validatePseudoDefinition(pseudoDefinition: unknown): ValidateResult<PseudoDefinition> {
    const objectValidation = validateObject(pseudoDefinition, ['name', 'key']);
    if (!objectValidation.valid) return { valid: false, message: `Pseudo definition must be a valid object with required properties 'name' and 'key', got: ${pseudoDefinition}` };

    const keyValidation = validatePseudoKey((pseudoDefinition as PseudoDefinition).key);
    if (!keyValidation.valid) return keyValidation;

    const nameValidation = validatePseudoName((pseudoDefinition as PseudoDefinition).name);
    if (!nameValidation.valid) return nameValidation;

	return { valid: true, value: pseudoDefinition as PseudoDefinition };
}
