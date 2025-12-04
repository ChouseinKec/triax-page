import type { DeviceDefinition, DeviceName, DeviceMedia, DeviceViewport } from '@/src/core/layout/page/types';

/**
 * Validates if a value is a valid device media query configuration.
 * Checks if the value has valid min/max numbers with proper range constraints.
 * @param deviceMedia - The value to validate
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
 * Validates if a value is a valid device viewport/template dimensions.
 * Checks if the value has positive width and height numbers.
 * @param deviceViewport - The value to validate
 */
export function isDeviceTemplateValid(deviceViewport: unknown): deviceViewport is DeviceViewport {
	return (
		typeof deviceViewport === 'object' &&
		deviceViewport !== null && //
		typeof (deviceViewport as DeviceViewport).width === 'number' &&
		typeof (deviceViewport as DeviceViewport).height === 'number' &&
		(deviceViewport as DeviceViewport).width > 0 &&
		(deviceViewport as DeviceViewport).height > 0
	);
}

/**
 * Validates if a value is a valid device name.
 * Checks if the value is a non-empty string.
 * @param deviceName - The value to validate
 */
export function isDeviceNameValid(deviceName: unknown): deviceName is DeviceName {
	return typeof deviceName === 'string' && deviceName.length > 0;
}

/**
 * Validates if a value is a valid device category.
 * Checks if the value is a non-empty string.
 * @param deviceCategory - The value to validate
 */
export function isDeviceCategoryValid(deviceCategory: unknown): deviceCategory is DeviceDefinition['category'] {
	return typeof deviceCategory === 'string' && deviceCategory.length > 0;
}

/**
 * Validates if a value is a valid device value identifier.
 * Checks if the value is a non-empty string.
 * @param deviceValue - The value to validate
 */
export function isDeviceValueValid(deviceValue: unknown): deviceValue is DeviceName {
	return typeof deviceValue === 'string' && deviceValue.length > 0;
}

/**
 * Validates if a value is a valid device identifier.
 * Checks if the value is a non-empty string.
 * @param deviceID - The value to validate
 */
export function isDeviceIDValid(deviceID: unknown): deviceID is string {
	return typeof deviceID === 'string' && deviceID.length > 0;
}

/**
 * Validates if a value is a valid device definition.
 * Checks if the value is an object with all required device properties.
 * @param deviceDefinition - The value to validate
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
