import type { DeviceDefinition, DeviceName, DeviceMedia, DeviceTemplate } from '@/src/page-builder/core/page/types/device';

/**
 * Validates if a value is a valid DeviceMedia object.
 */
export function isDeviceMediaValid(deviceMedia: unknown): deviceMedia is DeviceMedia {
	return (
		typeof deviceMedia === 'object' &&
		deviceMedia !== null && //
		typeof (deviceMedia as DeviceMedia).min === 'number' &&
		typeof (deviceMedia as DeviceMedia).max === 'number' &&
		(deviceMedia as DeviceMedia).min >= 0 &&
		(deviceMedia as DeviceMedia).max >= (deviceMedia as DeviceMedia).min
	);
}

/**
 * Validates if a value is a valid DeviceTemplate object.
 */
export function isDeviceTemplateValid(deviceTemplate: unknown): deviceTemplate is DeviceTemplate {
	return (
		typeof deviceTemplate === 'object' &&
		deviceTemplate !== null && //
		typeof (deviceTemplate as DeviceTemplate).width === 'number' &&
		typeof (deviceTemplate as DeviceTemplate).height === 'number' &&
		(deviceTemplate as DeviceTemplate).width > 0 &&
		(deviceTemplate as DeviceTemplate).height > 0
	);
}

/**
 * Validates if a value is a valid DeviceName.
 */
export function isDeviceNameValid(deviceName: unknown): deviceName is DeviceName {
	return typeof deviceName === 'string' && deviceName.length > 0;
}

/**
 * Validates if a value is a valid device category.
 */
export function isDeviceCategoryValid(deviceCategory: unknown): deviceCategory is DeviceDefinition['category'] {
	return typeof deviceCategory === 'string' && deviceCategory.length > 0;
}

/**
 * Validates if a value is a valid DeviceValue (internal identifier).
 */
export function isDeviceValueValid(deviceValue: unknown): deviceValue is DeviceName {
	return typeof deviceValue === 'string' && deviceValue.length > 0;
}

/**
 * Validates if a value is a valid DeviceID.
 */
export function isDeviceIDValid(deviceID: unknown): deviceID is string {
	return typeof deviceID === 'string' && deviceID.length > 0;
}

/**
 * Type guard to check if a value is a valid DeviceDefinition shape
 */
export function isDeviceDefinitionValid(deviceDefinition: unknown): deviceDefinition is Record<keyof DeviceDefinition, unknown> {
	return (
		typeof deviceDefinition === 'object' && //
		deviceDefinition !== null &&
		'name' in deviceDefinition &&
		'value' in deviceDefinition &&
		'media' in deviceDefinition &&
		'template' in deviceDefinition &&
		'category' in deviceDefinition
	);
}
