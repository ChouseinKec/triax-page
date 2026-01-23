// Types
import type { DeviceDefinition, DeviceKey, DeviceName, DeviceMedia, DeviceViewEditor, DeviceCategory } from '@/core/layout/page/types';
import type { ValidateResult } from '@/shared/types/result';

// Utilities
import { validateString, validateObject } from '@/shared/helpers/validators';

/**
 * Validates a device key for device operations.
 * Checks if the key is a valid string identifier.
 *
 * @param deviceKey - The device key to validate
 */
export function validateDeviceKey(deviceKey: unknown): ValidateResult<DeviceKey> {
	const stringValidation = validateString(deviceKey);
	if (!stringValidation.valid) return { valid: false, message: `Device key must be a valid string, got: ${deviceKey}` };

	return { valid: true, value: deviceKey as DeviceKey };
}

/**
 * Validates a device name for device operations.
 * Checks if the name is a valid string.
 *
 * @param deviceName - The device name to validate
 */
export function validateDeviceName(deviceName: unknown): ValidateResult<DeviceName> {
	const stringValidation = validateString(deviceName);
	if (!stringValidation.valid) return { valid: false, message: `Device name must be a valid string, got: ${deviceName}` };

	return { valid: true, value: deviceName as DeviceName };
}

/**
 * Validates device media for device operations.
 * Checks if the media configuration is valid.
 *
 * @param deviceMedia - The device media to validate
 */
export function validateDeviceMedia(deviceMedia: unknown): ValidateResult<DeviceMedia> {
	const objectValidation = validateObject(deviceMedia);
	if (!objectValidation.valid) return { valid: false, message: `Device media must be a valid object, got: ${JSON.stringify(deviceMedia)}` };

	const media = deviceMedia as Record<string, unknown>;
	const min = media.min;
	const max = media.max;

	if (typeof min !== 'number' || min < 0) {
		return { valid: false, message: `Device media.min must be a non-negative number, got: ${min}` };
	}

	if (typeof max !== 'number' || max <= 0 || max < min) {
		return { valid: false, message: `Device media.max must be a positive number greater than or equal to min, got: ${max}` };
	}

	return { valid: true, value: deviceMedia as DeviceMedia };
}

/**
 * Validates device template for device operations.
 * Checks if the template configuration is valid.
 *
 * @param deviceViewEditor - The device template to validate
 */
export function validateDeviceTemplate(deviceViewEditor: unknown): ValidateResult<DeviceViewEditor> {
	const objectValidation = validateObject(deviceViewEditor);
	if (!objectValidation.valid) return { valid: false, message: `Device template must be a valid object, got: ${JSON.stringify(deviceViewEditor)}` };

	const viewport = deviceViewEditor as Record<string, unknown>;
	const width = viewport.width;
	const height = viewport.height;

	if (typeof width !== 'number' || width <= 0) {
		return { valid: false, message: `Device template.width must be a positive number, got: ${width}` };
	}

	if (typeof height !== 'number' || height <= 0) {
		return { valid: false, message: `Device template.height must be a positive number, got: ${height}` };
	}

	return { valid: true, value: deviceViewEditor as DeviceViewEditor };
}

/**
 * Validates a device category for device operations.
 * Checks if the category is a valid string.
 *
 * @param deviceCategory - The device category to validate
 */
export function validateDeviceCategory(deviceCategory: unknown): ValidateResult<DeviceCategory> {
	const stringValidation = validateString(deviceCategory);
	if (!stringValidation.valid) return { valid: false, message: `Device category must be a valid string, got: ${deviceCategory}` };

	return { valid: true, value: deviceCategory as DeviceCategory };
}

/**
 * Validates a complete device definition for device operations.
 * Checks if the definition has all required valid properties including name, value, media, template, and category.
 *
 * @param deviceDefinition - The device definition to validate
 */
export function validateDeviceDefinition(deviceDefinition: unknown): ValidateResult<DeviceDefinition> {
	const objectValidation = validateObject(deviceDefinition, ['name', 'key', 'media', 'template', 'category']);
	if (!objectValidation.valid) return objectValidation;

	const keyValidation = validateDeviceKey(objectValidation.value.key);
	if (!keyValidation.valid) return keyValidation;

	const nameValidation = validateDeviceName(objectValidation.value.name);
	if (!nameValidation.valid) return nameValidation;

	const mediaValidation = validateDeviceMedia(objectValidation.value.media);
	if (!mediaValidation.valid) return mediaValidation;

	const templateValidation = validateDeviceTemplate(objectValidation.value.template);
	if (!templateValidation.valid) return templateValidation;

	const categoryValidation = validateDeviceCategory(objectValidation.value.category);
	if (!categoryValidation.valid) return categoryValidation;

	return { valid: true, value: deviceDefinition as DeviceDefinition };
}
