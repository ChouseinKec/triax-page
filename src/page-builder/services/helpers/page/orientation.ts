// Types
import type { OrientationDefinition } from '@/src/page-builder/core/page/types/orientation';
import type { ValidationResult } from '@/src/shared/types/result';

// Utilities
import { isOrientationNameValid, isOrientationValueValid } from '@/src/page-builder/core/page/utilities/orientation';

/**
 * Type guard to check if a value is a valid OrientationDefinition shape
 */
function isDefinitionShape(value: unknown): value is Record<keyof OrientationDefinition, unknown> {
	return (
		typeof value === 'object' && //
		value !== null &&
		'name' in value &&
		'value' in value
	);
}

/**
 * Validates a OrientationDefinition object.
 */
export function validateOrientationDefinition(orientation: unknown): ValidationResult {
	if (!orientation) return { success: false, error: 'Orientation definition is required' };

	if (!isDefinitionShape(orientation)) return { success: false, error: `Orientation definition must be an object with required properties, got: ${typeof orientation}` };

	if (!isOrientationNameValid(orientation.name)) return { success: false, error: `Orientation definition requires a valid name, got: ${orientation.name}` };

	if (!isOrientationValueValid(orientation.value)) return { success: false, error: `Orientation definition requires a valid value, got: ${orientation.value}` };

	return { success: true };
}
