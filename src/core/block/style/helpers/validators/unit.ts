// Types
import type { UnitDefinition, UnitKey, UnitType, UnitDefault } from '@/src/core/block/style/types/';
import type { ValidateResult } from '@/src/shared/types/result';

// Helpers
import { validateObject, validateString } from '@/src/shared/helpers';

/**
 * Validates a CSS data type token key.
 * @param unitKey - The unit key to validate
 */
export function validateUnitKey(unitKey: unknown): ValidateResult<UnitKey> {
	const validation = validateString(unitKey);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as UnitKey };
}

/**
 * Validates a CSS data type token syntax.
 * @param unitType - The unit type to validate
 */
export function validateUnitType(unitType: unknown): ValidateResult<UnitType> {
	const validation = validateString(unitType);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as UnitType };
}


/**
 * Validates a CSS data type token definition.
 * @param unitDefinition - The unit definition to validate
 */
export function validateUnitDefinition(unitDefinition: unknown): ValidateResult<UnitDefinition> {
	const validation = validateObject(unitDefinition, ['key', 'type']);
	if (!validation.valid) return validation;

	const keyValidation = validateString(validation.value.key);
	if (!keyValidation.valid) return { valid: false, message: `Unit definition "key" is invalid: ${keyValidation.message}` };

	const typeValidation = validateUnitType(validation.value.type);
	if (!typeValidation.valid) return { valid: false, message: `Unit definition "type" is invalid: ${typeValidation.message}` };

	return { valid: true, value: validation.value as unknown as UnitDefinition };
}
