// Types
import type { OrientationDefinition, OrientationID, OrientationName, OrientationValue } from '@/src/page-builder/core/page/types/orientation';
import type { ValidationResult } from '@/src/shared/types/result';

// Utilities
import { isOrientationDefinitionValid, isOrientationIDValid, isOrientationNameValid, isOrientationValueValid } from '@/src/page-builder/core/page/utilities/orientation';

/**
 * Validates an orientation ID for orientation operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param orientationID - The orientation ID to validate
 * @returns ValidationResult containing validity and the validated OrientationID if valid
 *
 * @example
 * validateOrientationID('orientation-123') → { valid: true, value: 'orientation-123' }
 */
export function validateOrientationID(orientationID: unknown): ValidationResult<OrientationID> {
	if (!isOrientationIDValid(orientationID)) return { valid: false, message: `Orientation ID must be a valid string, got: ${orientationID}` };
	return { valid: true, value: orientationID as OrientationID };
}

/**
 * Validates an orientation name for orientation operations.
 * Checks if the name is a valid string.
 *
 * @param orientationName - The orientation name to validate
 * @returns ValidationResult containing validity and the validated OrientationName if valid
 *
 * @example
 * validateOrientationName('Landscape') → { valid: true, value: 'Landscape' }
 */
export function validateOrientationName(orientationName: unknown): ValidationResult<OrientationName> {
	if (!isOrientationNameValid(orientationName)) return { valid: false, message: `Orientation name must be a valid string, got: ${orientationName}` };
	return { valid: true, value: orientationName as OrientationName };
}

/**
 * Validates an orientation value for orientation operations.
 * Checks if the value is a valid string.
 *
 * @param orientationValue - The orientation value to validate
 * @returns ValidationResult containing validity and the validated OrientationValue if valid
 *
 * @example
 * validateOrientationValue('90deg') → { valid: true, value: '90deg' }
 */
export function validateOrientationValue(orientationValue: unknown): ValidationResult<OrientationValue> {
	if (!isOrientationValueValid(orientationValue)) return { valid: false, message: `Orientation value must be a valid string, got: ${orientationValue}` };
	return { valid: true, value: orientationValue as OrientationValue };
}

/**
 * Validates a complete orientation definition for orientation operations.
 * Checks if the definition has all required valid properties including name and value.
 *
 * @param orientationDefinition - The orientation definition to validate
 * @returns ValidationResult containing validity and the validated OrientationDefinition if valid
 *
 * @example
 * validateOrientationDefinition({ name: 'Portrait', value: '0deg' }) → { valid: true, value: { name: 'Portrait', value: '0deg' } }
 */
export function validateOrientationDefinition(orientationDefinition: unknown): ValidationResult<OrientationDefinition> {
	if (!isOrientationDefinitionValid(orientationDefinition)) return { valid: false, message: `Orientation definition must be an object with required properties, got: ${typeof orientationDefinition}` };

	const nameValidation = validateOrientationName(orientationDefinition.name);
	if (!nameValidation.valid) return nameValidation;

	const valueValidation = validateOrientationValue(orientationDefinition.value);
	if (!valueValidation.valid) return valueValidation;

	return { valid: true, value: orientationDefinition as OrientationDefinition };
}
