// Types
import type { OrientationDefinition, OrientationID, OrientationName, OrientationValue } from '@/src/core/layout/page/types';

/**
 * Validates if a value is a valid orientation name.
 * Checks if the value is a non-empty string.
 * @param orientationName - The value to validate
 * @returns True if valid OrientationName, false otherwise
 * @example
 * isOrientationNameValid('portrait') → true
 * isOrientationNameValid('') → false
 */
export function isOrientationNameValid(orientationName: unknown): orientationName is OrientationName {
	return typeof orientationName === 'string' && orientationName.length > 0;
}

/**
 * Validates if a value is a valid orientation value identifier.
 * Checks if the value is a non-empty string.
 * @param orientationValue - The value to validate
 * @returns True if valid OrientationValue, false otherwise
 * @example
 * isOrientationValueValid('landscape') → true
 */
export function isOrientationValueValid(orientationValue: unknown): orientationValue is OrientationValue {
	return typeof orientationValue === 'string' && orientationValue.length > 0;
}

/**
 * Validates if a value is a valid orientation identifier.
 * Checks if the value is a non-empty string.
 * @param orientationID - The value to validate
 * @returns True if valid OrientationID, false otherwise
 * @example
 * isOrientationIDValid('portrait') → true
 */
export function isOrientationIDValid(orientationID: unknown): orientationID is OrientationID {
	return typeof orientationID === 'string' && orientationID.length > 0;
}

/**
 * Validates if a value is a valid orientation definition.
 * Checks if the value is an object with all required orientation properties.
 * @param orientationDefinition - The value to validate
 * @returns True if valid OrientationDefinition shape, false otherwise
 * @example
 * isOrientationDefinitionValid({ name: 'Portrait', value: 'portrait' }) → true
 */
export function isOrientationDefinitionValid(orientationDefinition: unknown): orientationDefinition is Record<keyof OrientationDefinition, unknown> {
	return (
		typeof orientationDefinition === 'object' && //
		orientationDefinition !== null &&
		'name' in orientationDefinition &&
		'value' in orientationDefinition
	);
}
