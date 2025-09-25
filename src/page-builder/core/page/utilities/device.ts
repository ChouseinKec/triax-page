import type { DeviceDefinition, DeviceName, DeviceMedia, DeviceTemplate } from '@/src/page-builder/core/page/types/device';

/**
 * Validates if a value is a valid DeviceMedia object.
 */
export function isDeviceMediaValid(value: unknown): value is DeviceMedia {
	return typeof value === 'object' && value !== null &&
		typeof (value as DeviceMedia).min === 'number' &&
		typeof (value as DeviceMedia).max === 'number' &&
		(value as DeviceMedia).min >= 0 &&
		(value as DeviceMedia).max >= (value as DeviceMedia).min;
}

/**
 * Validates if a value is a valid DeviceTemplate object.
 */
export function isDeviceTemplateValid(value: unknown): value is DeviceTemplate {
	return typeof value === 'object' && value !== null &&
		typeof (value as DeviceTemplate).width === 'number' &&
		typeof (value as DeviceTemplate).height === 'number' &&
		(value as DeviceTemplate).width > 0 &&
		(value as DeviceTemplate).height > 0;
}

/**
 * Validates if a value is a valid DeviceName.
 */
export function isDeviceNameValid(value: unknown): value is DeviceName {
	return typeof value === 'string' && value.length > 0;
}

/**
 * Validates if a value is a valid device category.
 */
export function isDeviceCategoryValid(value: unknown): value is DeviceDefinition['category'] {
	return typeof value === 'string' && value.length > 0;
}

/**
 * Validates if a value is a valid DeviceValue (internal identifier).
 */
export function isDeviceValueValid(value: unknown): value is DeviceName {
	return typeof value === 'string' && value.length > 0;
}

/**
 * Validates if a value is a valid DeviceID.
 */
export function isDeviceIDValid(value: unknown): value is string {
	return typeof value === 'string' && value.length > 0;
}

