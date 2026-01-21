// Types
import type { ElementKey, ElementDefinition, ElementDescription, ElementAllowedAttributes, ElementForbiddenAncestors, ElementOrderedChildren, ElementUniqueChildren } from '@/core/block/element/types';
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
 * Validates an array of ordered children for an element.
 *
 * @param orderedChildren - The ordered children to validate
 */
export function validateElementOrderedChildren(orderedChildren: unknown): ValidateResult<ElementOrderedChildren | null> {
	if (orderedChildren === null) return { valid: true, value: null };

	const arrayValidation = validateArray(orderedChildren);
	if (!arrayValidation.valid) return arrayValidation;

	return { valid: true, value: arrayValidation.value as ElementOrderedChildren };
}

/**
 * Validates a record of unique children for an element.
 *
 * @param uniqueChildren - The unique children to validate
 */
export function validateElementUniqueChildren(uniqueChildren: unknown): ValidateResult<ElementUniqueChildren | null> {
	if (uniqueChildren === null) return { valid: true, value: null };

	const objectValidation = validateObject(uniqueChildren);
	if (!objectValidation.valid) return objectValidation;

	return { valid: true, value: objectValidation.value as ElementUniqueChildren };
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
 * Validates an ElementDefinition object.
 *
 * @param elementDefinition - The element definition to validate
 */
export function validateElementDefinition(elementDefinition: unknown): ValidateResult<ElementDefinition> {
	const objectValidation = validateObject(elementDefinition, ['key', 'description', 'allowedAttributes', 'allowedChildren', 'forbiddenAncestors', 'uniqueChildren', 'orderedChildren']);
	if (!objectValidation.valid) return objectValidation;

	const keyValidation = validateElementKey(objectValidation.value.key);
	if (!keyValidation.valid) return keyValidation;

	const descriptionValidation = validateElementDescription(objectValidation.value.description);
	if (!descriptionValidation.valid) return descriptionValidation;

	const forbiddenAncestorsValidation = validateElementForbiddenAncestors(objectValidation.value.forbiddenAncestors);
	if (!forbiddenAncestorsValidation.valid) return forbiddenAncestorsValidation;

	const orderedChildrenValidation = validateElementOrderedChildren(objectValidation.value.orderedChildren);
	if (!orderedChildrenValidation.valid) return orderedChildrenValidation;

	const uniqueChildrenValidation = validateElementUniqueChildren(objectValidation.value.uniqueChildren);
	if (!uniqueChildrenValidation.valid) return uniqueChildrenValidation;

	const allowedAttributesValidation = validateElementAllowedAttributes(objectValidation.value.allowedAttributes);
	if (!allowedAttributesValidation.valid) return allowedAttributesValidation;

	return { valid: true, value: objectValidation.value as unknown as ElementDefinition };
}
