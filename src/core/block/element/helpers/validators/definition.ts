// Types
import type { ElementKey, ElementDefinition, ElementDescription, ElementAllowedAttributes, ElementForbiddenAncestors } from '@/core/block/element/types';
import type { ValidateResult } from '@/shared/types/result';

// Utilities
import { validateString, validateArray, validateObject } from '@/shared/helpers';

/**
 * Validates an element key.
 *
 * @param elementKey - The element key to validate
 */
export function validateElementKey(elementKey: unknown): ValidateResult<ElementKey> {
	const stringValidation = validateString(elementKey);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value as ElementKey };
}

/**
 * Validates an element description.
 *
 * @param description - The description to validate
 */
export function validateElementDescription(description: unknown): ValidateResult<ElementDescription> {
	const stringValidation = validateString(description);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value as ElementDescription };
}

/**
 * Validates an array of forbidden ancestors for an element.
 *
 * @param forbiddenAncestors - The forbidden ancestors to validate
 */
export function validateElementForbiddenAncestors(forbiddenAncestors: unknown): ValidateResult<ElementForbiddenAncestors | null> {
	if (forbiddenAncestors === null) return { valid: true, value: null };

	const arrayValidation = validateArray(forbiddenAncestors);
	if (!arrayValidation.valid) return arrayValidation;

	return { valid: true, value: arrayValidation.value as ElementForbiddenAncestors };
}

/**
 * Validates an array of allowed attribute keys for an element.
 *
 * @param allowedAttributes - The allowed attributes to validate
 */
export function validateElementAllowedAttributes(allowedAttributes: unknown): ValidateResult<ElementAllowedAttributes> {
	const arrayValidation = validateArray(allowedAttributes);
	if (!arrayValidation.valid) return arrayValidation;

	return { valid: true, value: arrayValidation.value as ElementAllowedAttributes };
}

/**
 * Validates an array of allowed children for an element.
 *
 * @param allowedChildren - The allowed children to validate
 */
export function validateElementAllowedChildren(allowedChildren: unknown): ValidateResult<ElementKey[] | null> {
	if (allowedChildren === null) return { valid: true, value: null };

	const arrayValidation = validateArray(allowedChildren);
	if (!arrayValidation.valid) return arrayValidation;

	return { valid: true, value: arrayValidation.value as ElementKey[] };
}

export function validateElementStructure(structure: unknown): ValidateResult<ElementDefinition['structure']> {
	if (structure === null) return { valid: true, value: null };

	const arrayValidation = validateArray(structure);
	if (!arrayValidation.valid) return arrayValidation;


	return { valid: true, value: arrayValidation.value as ElementDefinition['structure'] };
}

/**
 * Validates an ElementDefinition object.
 *
 * @param elementDefinition - The element definition to validate
 */
export function validateElementDefinition(elementDefinition: unknown): ValidateResult<ElementDefinition> {
	const objectValidation = validateObject(elementDefinition, ['key', 'description', 'allowedAttributes', 'allowedChildren', 'forbiddenAncestors', 'structure']);
	if (!objectValidation.valid) return objectValidation;

	const keyValidation = validateElementKey(objectValidation.value.key);
	if (!keyValidation.valid) return keyValidation;

	const descriptionValidation = validateElementDescription(objectValidation.value.description);
	if (!descriptionValidation.valid) return descriptionValidation;

	const forbiddenAncestorsValidation = validateElementForbiddenAncestors(objectValidation.value.forbiddenAncestors);
	if (!forbiddenAncestorsValidation.valid) return forbiddenAncestorsValidation;

	const allowedAttributesValidation = validateElementAllowedAttributes(objectValidation.value.allowedAttributes);
	if (!allowedAttributesValidation.valid) return allowedAttributesValidation;

	const allowedChildrenValidation = validateElementAllowedChildren(objectValidation.value.allowedChildren);
	if (!allowedChildrenValidation.valid) return allowedChildrenValidation;

	const structureValidation = validateElementStructure(objectValidation.value.structure);
	if (!structureValidation.valid) return structureValidation;

	return { valid: true, value: objectValidation.value as unknown as ElementDefinition };
}
