// Types
import type { PseudoDefinition, PseudoID, PseudoName, PseudoValue } from '@/src/core/layout/page/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Utilities
import { isPseudoDefinitionValid, isPseudoIDValid, isPseudoNameValid, isPseudoValueValid } from '@/src/core/layout/page/utilities';

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