// Types
import type { DeviceDefinition, DeviceID, DeviceName, DeviceValue, DeviceMedia, DeviceViewport, DeviceCategory } from '@/src/core/layout/page/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { isDeviceDefinitionValid, isDeviceNameValid, isDeviceValueValid, isDeviceMediaValid, isDeviceTemplateValid, isDeviceCategoryValid, isDeviceIDValid } from '@/src/core/layout/page/utilities';

/**
 * Validates a device ID for device operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param deviceID - The device ID to validate
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

