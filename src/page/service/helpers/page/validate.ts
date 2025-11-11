// Types
import type { DeviceDefinition, DeviceID, DeviceName, DeviceValue, DeviceMedia, DeviceViewport, DeviceCategory } from '@/src/page/core/page/types/device';
import type { OrientationDefinition, OrientationID, OrientationName, OrientationValue } from '@/src/page/core/page/types/orientation';
import type { PseudoDefinition, PseudoID, PseudoName, PseudoValue } from '@/src/page/core/page/types/pseudo';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { isDeviceDefinitionValid, isDeviceNameValid, isDeviceValueValid, isDeviceMediaValid, isDeviceTemplateValid, isDeviceCategoryValid, isDeviceIDValid } from '@/src/page/core/page/utilities/device';
import { isOrientationDefinitionValid, isOrientationIDValid, isOrientationNameValid, isOrientationValueValid } from '@/src/page/core/page/utilities/orientation';
import { isPseudoDefinitionValid, isPseudoIDValid, isPseudoNameValid, isPseudoValueValid } from '@/src/page/core/page/utilities/pseudo';

/**
 * Validates a device ID for device operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param deviceID - The device ID to validate
 * @returns ValidateResult containing validity and the validated DeviceID if valid
 *
 * @example
 * validateDeviceID('device-123') → { valid: true, value: 'device-123' }
 */
export function validateDeviceID(deviceID: unknown): ValidateResult<DeviceID> {
	if (!isDeviceIDValid(deviceID)) return { valid: false, message: `Device ID must be a valid string, got: ${deviceID}` };
	return { valid: true, value: deviceID as DeviceID };
}

/**
 * Validates a device name for device operations.
 * Checks if the name is a valid string.
 *
 * @param deviceName - The device name to validate
 * @returns ValidateResult containing validity and the validated DeviceName if valid
 *
 * @example
 * validateDeviceName('Desktop') → { valid: true, value: 'Desktop' }
 */
export function validateDeviceName(deviceName: unknown): ValidateResult<DeviceName> {
	if (!isDeviceNameValid(deviceName)) return { valid: false, message: `Device name must be a valid string, got: ${deviceName}` };
	return { valid: true, value: deviceName as DeviceName };
}

/**
 * Validates a device value for device operations.
 * Checks if the value is a valid string.
 *
 * @param deviceValue - The device value to validate
 * @returns ValidateResult containing validity and the validated DeviceValue if valid
 *
 * @example
 * validateDeviceValue('1920px') → { valid: true, value: '1920px' }
 */
export function validateDeviceValue(deviceValue: unknown): ValidateResult<DeviceValue> {
	if (!isDeviceValueValid(deviceValue)) return { valid: false, message: `Device value must be a valid string, got: ${deviceValue}` };
	return { valid: true, value: deviceValue as DeviceValue };
}

/**
 * Validates device media for device operations.
 * Checks if the media configuration is valid.
 *
 * @param deviceMedia - The device media to validate
 * @returns ValidateResult containing validity and the validated DeviceMedia if valid
 *
 * @example
 * validateDeviceMedia({ minWidth: 768, maxWidth: 1024 }) → { valid: true, value: { minWidth: 768, maxWidth: 1024 } }
 */
export function validateDeviceMedia(deviceMedia: unknown): ValidateResult<DeviceMedia> {
	if (!isDeviceMediaValid(deviceMedia)) return { valid: false, message: `Device media must be valid, got: ${JSON.stringify(deviceMedia)}` };
	return { valid: true, value: deviceMedia as DeviceMedia };
}

/**
 * Validates device template for device operations.
 * Checks if the template configuration is valid.
 *
 * @param deviceViewport - The device template to validate
 * @returns ValidateResult containing validity and the validated DeviceViewport if valid
 *
 * @example
 * validateDeviceTemplate({ width: 1024, height: 768 }) → { valid: true, value: { width: 1024, height: 768 } }
 */
export function validateDeviceTemplate(deviceViewport: unknown): ValidateResult<DeviceViewport> {
	if (!isDeviceTemplateValid(deviceViewport)) return { valid: false, message: `Device template must be valid, got: ${JSON.stringify(deviceViewport)}` };
	return { valid: true, value: deviceViewport as DeviceViewport };
}

/**
 * Validates a device category for device operations.
 * Checks if the category is a valid string.
 *
 * @param deviceCategory - The device category to validate
 * @returns ValidateResult containing validity and the validated DeviceCategory if valid
 *
 * @example
 * validateDeviceCategory('mobile') → { valid: true, value: 'mobile' }
 */
export function validateDeviceCategory(deviceCategory: unknown): ValidateResult<DeviceCategory> {
	if (!isDeviceCategoryValid(deviceCategory)) return { valid: false, message: `Device category must be a valid string, got: ${deviceCategory}` };
	return { valid: true, value: deviceCategory as DeviceCategory };
}

/**
 * Validates a complete device definition for device operations.
 * Checks if the definition has all required valid properties including name, value, media, template, and category.
 *
 * @param deviceDefinition - The device definition to validate
 * @returns ValidateResult containing validity and the validated DeviceDefinition if valid
 *
 * @example
 * validateDeviceDefinition({ name: 'Tablet', value: '768px', media: { minWidth: 768 }, template: { width: 768 }, category: 'tablet' }) → { valid: true, value: {...} }
 */
export function validateDeviceDefinition(deviceDefinition: unknown): ValidateResult<DeviceDefinition> {
	if (!isDeviceDefinitionValid(deviceDefinition)) return { valid: false, message: `Device definition must be an object with required properties, got: ${typeof deviceDefinition}` };

	const nameValidation = validateDeviceName(deviceDefinition.name);
	if (!nameValidation.valid) return nameValidation;

	const valueValidation = validateDeviceValue(deviceDefinition.value);
	if (!valueValidation.valid) return valueValidation;

	const mediaValidation = validateDeviceMedia(deviceDefinition.media);
	if (!mediaValidation.valid) return mediaValidation;

	const templateValidation = validateDeviceTemplate(deviceDefinition.template);
	if (!templateValidation.valid) return templateValidation;

	const categoryValidation = validateDeviceCategory(deviceDefinition.category);
	if (!categoryValidation.valid) return categoryValidation;

	return { valid: true, value: deviceDefinition as DeviceDefinition };
}

/**
 * Validates an orientation ID for orientation operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param orientationID - The orientation ID to validate
 * @returns ValidateResult containing validity and the validated OrientationID if valid
 *
 * @example
 * validateOrientationID('orientation-123') → { valid: true, value: 'orientation-123' }
 */
export function validateOrientationID(orientationID: unknown): ValidateResult<OrientationID> {
	if (!isOrientationIDValid(orientationID)) return { valid: false, message: `Orientation ID must be a valid string, got: ${orientationID}` };
	return { valid: true, value: orientationID as OrientationID };
}

/**
 * Validates an orientation name for orientation operations.
 * Checks if the name is a valid string.
 *
 * @param orientationName - The orientation name to validate
 * @returns ValidateResult containing validity and the validated OrientationName if valid
 *
 * @example
 * validateOrientationName('Landscape') → { valid: true, value: 'Landscape' }
 */
export function validateOrientationName(orientationName: unknown): ValidateResult<OrientationName> {
	if (!isOrientationNameValid(orientationName)) return { valid: false, message: `Orientation name must be a valid string, got: ${orientationName}` };
	return { valid: true, value: orientationName as OrientationName };
}

/**
 * Validates an orientation value for orientation operations.
 * Checks if the value is a valid string.
 *
 * @param orientationValue - The orientation value to validate
 * @returns ValidateResult containing validity and the validated OrientationValue if valid
 *
 * @example
 * validateOrientationValue('90deg') → { valid: true, value: '90deg' }
 */
export function validateOrientationValue(orientationValue: unknown): ValidateResult<OrientationValue> {
	if (!isOrientationValueValid(orientationValue)) return { valid: false, message: `Orientation value must be a valid string, got: ${orientationValue}` };
	return { valid: true, value: orientationValue as OrientationValue };
}

/**
 * Validates a complete orientation definition for orientation operations.
 * Checks if the definition has all required valid properties including name and value.
 *
 * @param orientationDefinition - The orientation definition to validate
 * @returns ValidateResult containing validity and the validated OrientationDefinition if valid
 *
 * @example
 * validateOrientationDefinition({ name: 'Portrait', value: '0deg' }) → { valid: true, value: { name: 'Portrait', value: '0deg' } }
 */
export function validateOrientationDefinition(orientationDefinition: unknown): ValidateResult<OrientationDefinition> {
	if (!isOrientationDefinitionValid(orientationDefinition)) return { valid: false, message: `Orientation definition must be an object with required properties, got: ${typeof orientationDefinition}` };

	const nameValidation = validateOrientationName(orientationDefinition.name);
	if (!nameValidation.valid) return nameValidation;

	const valueValidation = validateOrientationValue(orientationDefinition.value);
	if (!valueValidation.valid) return valueValidation;

	return { valid: true, value: orientationDefinition as OrientationDefinition };
}

/**
 * Validates a pseudo ID for pseudo operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param pseudoID - The pseudo ID to validate
 * @returns ValidateResult containing validity and the validated PseudoID if valid
 *
 * @example
 * validatePseudoID('pseudo-123') → { valid: true, value: 'pseudo-123' }
 */
export function validatePseudoID(pseudoID: unknown): ValidateResult<PseudoID> {
	if (!isPseudoIDValid(pseudoID)) return { valid: false, message: `Pseudo ID must be a valid string, got: ${pseudoID}` };
	return { valid: true, value: pseudoID as PseudoID };
}

/**
 * Validates a pseudo name for pseudo operations.
 * Checks if the name is a valid string.
 *
 * @param pseudoName - The pseudo name to validate
 * @returns ValidateResult containing validity and the validated PseudoName if valid
 *
 * @example
 * validatePseudoName('hover') → { valid: true, value: 'hover' }
 */
export function validatePseudoName(pseudoName: unknown): ValidateResult<PseudoName> {
	if (!isPseudoNameValid(pseudoName)) return { valid: false, message: `Pseudo name must be a valid string, got: ${pseudoName}` };
	return { valid: true, value: pseudoName as PseudoName };
}

/**
 * Validates a pseudo value for pseudo operations.
 * Checks if the value is a valid string.
 *
 * @param pseudoValue - The pseudo value to validate
 * @returns ValidateResult containing validity and the validated PseudoValue if valid
 *
 * @example
 * validatePseudoValue(':hover') → { valid: true, value: ':hover' }
 */
export function validatePseudoValue(pseudoValue: unknown): ValidateResult<PseudoValue> {
	if (!isPseudoValueValid(pseudoValue)) return { valid: false, message: `Pseudo value must be a valid string, got: ${pseudoValue}` };
	return { valid: true, value: pseudoValue as PseudoValue };
}

/**
 * Validates a complete pseudo definition for pseudo operations.
 * Checks if the definition has all required valid properties including name and value.
 *
 * @param pseudoDefinition - The pseudo definition to validate
 * @returns ValidateResult containing validity and the validated PseudoDefinition if valid
 *
 * @example
 * validatePseudoDefinition({ name: 'hover', value: ':hover' }) → { valid: true, value: { name: 'hover', value: ':hover' } }
 */
export function validatePseudoDefinition(pseudoDefinition: unknown): ValidateResult<PseudoDefinition> {
	if (!isPseudoDefinitionValid(pseudoDefinition)) return { valid: false, message: `Pseudo definition must be an object with required properties, got: ${typeof pseudoDefinition}` };

	const nameValidation = validatePseudoName(pseudoDefinition.name);
	if (!nameValidation.valid) return nameValidation;

	const valueValidation = validatePseudoValue(pseudoDefinition.value);
	if (!valueValidation.valid) return valueValidation;

	return { valid: true, value: pseudoDefinition as PseudoDefinition };
}