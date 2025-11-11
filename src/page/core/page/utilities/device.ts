import type { DeviceDefinition, DeviceName, DeviceMedia, DeviceViewport } from '@/src/page/core/page/types/device';

/**
 * Validates if a value is a valid device media query configuration.
 * Checks if the value has valid min/max numbers with proper range constraints.
 * @param deviceMedia - The value to validate
 * @returns True if valid DeviceMedia, false otherwise
 * @example
 * isDeviceMediaValid({ min: 0, max: 768 }) → true
 * isDeviceMediaValid({ min: 768, max: 0 }) → false (max must be >= min)
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
 * @returns True if valid DeviceViewport, false otherwise
 * @example
 * isDeviceTemplateValid({ width: 375, height: 667 }) → true
 * isDeviceTemplateValid({ width: 0, height: 667 }) → false (must be > 0)
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
 * @returns True if valid DeviceName, false otherwise
 * @example
 * isDeviceNameValid('iphone-14') → true
 * isDeviceNameValid('') → false
 */
export function isDeviceNameValid(deviceName: unknown): deviceName is DeviceName {
	return typeof deviceName === 'string' && deviceName.length > 0;
}

/**
 * Validates if a value is a valid device category.
 * Checks if the value is a non-empty string.
 * @param deviceCategory - The value to validate
 * @returns True if valid device category, false otherwise
 * @example
 * isDeviceCategoryValid('phone') → true
 * isDeviceCategoryValid('tablet') → true
 */
export function isDeviceCategoryValid(deviceCategory: unknown): deviceCategory is DeviceDefinition['category'] {
	return typeof deviceCategory === 'string' && deviceCategory.length > 0;
}

/**
 * Validates if a value is a valid device value identifier.
 * Checks if the value is a non-empty string.
 * @param deviceValue - The value to validate
 * @returns True if valid DeviceValue, false otherwise
 * @example
 * isDeviceValueValid('mobile-sm') → true
 */
export function isDeviceValueValid(deviceValue: unknown): deviceValue is DeviceName {
	return typeof deviceValue === 'string' && deviceValue.length > 0;
}

/**
 * Validates if a value is a valid device identifier.
 * Checks if the value is a non-empty string.
 * @param deviceID - The value to validate
 * @returns True if valid DeviceID, false otherwise
 * @example
 * isDeviceIDValid('desktop-sm') → true
 */
export function isDeviceIDValid(deviceID: unknown): deviceID is string {
	return typeof deviceID === 'string' && deviceID.length > 0;
}

/**
 * Validates if a value is a valid device definition.
 * Checks if the value is an object with all required device properties.
 * @param deviceDefinition - The value to validate
 * @returns True if valid DeviceDefinition shape, false otherwise
 * @example
 * isDeviceDefinitionValid({ name: 'iPhone', value: 'iphone-14', media: {...}, template: {...}, category: 'phone' }) → true
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
