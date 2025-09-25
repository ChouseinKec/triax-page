// Types
import type { OrientationID, OrientationName, OrientationValue } from '@/src/page-builder/core/page/types/orientation';

/**
 * Validates that an orientation name is valid
 */
export function isOrientationNameValid(name: unknown): name is OrientationName {
	return typeof name === 'string' && ['all', 'portrait', 'landscape'].includes(name);
}

/**
 * Validates that an orientation value is valid
 */
export function isOrientationValueValid(value: unknown): value is OrientationValue {
	return typeof value === 'string' && ['all', 'portrait', 'landscape'].includes(value);
}

/**
 * Validates that an orientation ID is valid
*/
export function isOrientationIDValid(value: unknown): value is OrientationID {
	return typeof value === 'string' && value.length > 0;
}
