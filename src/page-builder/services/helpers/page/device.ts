// Types
import type { DeviceDefinition } from '@/src/page-builder/core/page/types/device';
import type { ValidationResult } from '@/src/shared/types/result';

// Utilities
import { isDeviceNameValid, isDeviceValueValid, isDeviceMediaValid, isDeviceTemplateValid, isDeviceCategoryValid } from '@/src/page-builder/core/page/utilities/device';

/**
 * Type guard to check if a value is a valid DeviceDefinition shape
 */
function isDefinitionShape(value: unknown): value is Record<keyof DeviceDefinition, unknown> {
	return (
		typeof value === 'object' && //
		value !== null &&
		'name' in value &&
		'value' in value &&
		'media' in value &&
		'template' in value &&
		'category' in value
	);
}

/**
 * Validates a DeviceDefinition object.
*/
export function validateDeviceDefinition(device: unknown): ValidationResult {
	if (!device) return { success: false, error: 'Device definition is required' };

	if (!isDefinitionShape(device)) return { success: false, error: `Device definition must be an object with required properties, got: ${typeof device}` };

	if (!isDeviceNameValid(device.name)) return { success: false, error: `Device definition requires a valid name, got: ${device.name}` };

	if (!isDeviceValueValid(device.value)) return { success: false, error: `Device definition requires a valid value, got: ${device.value}` };

	if (!isDeviceMediaValid(device.media)) return { success: false, error: `Device definition requires valid media, got: ${JSON.stringify(device.media)}` };

	if (!isDeviceTemplateValid(device.template)) return { success: false, error: `Device definition requires valid template, got: ${JSON.stringify(device.template)}` };

	if (!isDeviceCategoryValid(device.category)) return { success: false, error: `Device definition requires a valid category, got: ${device.category}` };

	return { success: true };
}
