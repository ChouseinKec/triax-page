// Types
import type { OrientationDefinition, OrientationKey, OrientationName } from '@/src/core/layout/page/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { validateString, validateObject } from '@/src/shared/helpers';

/**
 * Validates an orientation ID for orientation operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param orientationKey - The orientation ID to validate
 */
export function validateOrientationKey(orientationKey: unknown): ValidateResult<OrientationKey> {
	const stringValidation = validateString(orientationKey);
	if (!stringValidation.valid) return { valid: false, message: `Orientation key must be a valid string, got: ${orientationKey}` };

	return { valid: true, value: orientationKey as OrientationKey };
}

/**
 * Validates an orientation name for orientation operations.
 * Checks if the name is a valid string.
 *
 * @param orientationName - The orientation name to validate
 */
export function validateOrientationName(orientationName: unknown): ValidateResult<OrientationName> {
	const stringValidation = validateString(orientationName);
	if (!stringValidation.valid) return { valid: false, message: `Orientation name must be a valid string, got: ${orientationName}` };

	return { valid: true, value: orientationName as OrientationName };
}

/**
 * Validates a complete orientation definition for orientation operations.
 * Checks if the definition has all required valid properties including name and value.
 *
 * @param orientationDefinition - The orientation definition to validate
 */
export function validateOrientationDefinition(orientationDefinition: unknown): ValidateResult<OrientationDefinition> {
	const objectValidation = validateObject(orientationDefinition, ['name', 'key']);
	if (!objectValidation.valid) return { valid: false, message: `Orientation definition must be a valid object with required properties 'name' and 'key', got: ${orientationDefinition}` };

	const keyValidation = validateOrientationKey((orientationDefinition as OrientationDefinition).key);
	if (!keyValidation.valid) return keyValidation;

	const nameValidation = validateOrientationName((orientationDefinition as OrientationDefinition).name);
	if (!nameValidation.valid) return nameValidation;

	return { valid: true, value: orientationDefinition as OrientationDefinition };
}
