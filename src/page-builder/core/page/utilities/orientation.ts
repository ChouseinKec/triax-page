// Types
import type { OrientationDefinition, OrientationID, OrientationName, OrientationValue } from '@/src/page-builder/core/page/types/orientation';

/**
 * Validates that an orientation name is valid
 */
export function isOrientationNameValid(orientationName: unknown): orientationName is OrientationName {
	return typeof orientationName === 'string' && orientationName.length > 0;
}

/**
 * Validates that an orientation value is valid
 */
export function isOrientationValueValid(orientationValue: unknown): orientationValue is OrientationValue {
	return typeof orientationValue === 'string' && orientationValue.length > 0;
}

/**
 * Validates that an orientation ID is valid
 */
export function isOrientationIDValid(orientationID: unknown): orientationID is OrientationID {
	return typeof orientationID === 'string' && orientationID.length > 0;
}

/**
 * Type guard to check if a value is a valid OrientationDefinition shape
 */
export function isOrientationDefinitionValid(orientationDefinition: unknown): orientationDefinition is Record<keyof OrientationDefinition, unknown> {
	return (
		typeof orientationDefinition === 'object' && //
		orientationDefinition !== null &&
		'name' in orientationDefinition &&
		'value' in orientationDefinition
	);
}
