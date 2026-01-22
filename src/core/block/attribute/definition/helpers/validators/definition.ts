// Types
import type { AttributeKey, AttributeSyntax, AttributeDescription, AttributeCategory, AttributeDefinition, AttributeValue } from '@/core/block/attribute/definition/types';
import type { ValidateResult } from '@/shared/types/result';

// Helpers
import { validateString, validateObject } from '@/shared/helpers';

/**
 * Validates if the provided value is a valid AttributeKey.
 *
 * @param attributeKey - The attribute key to validate
 */
export function validateAttributeKey(attributeKey: unknown): ValidateResult<AttributeKey> {
	const stringValidation = validateString(attributeKey);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value as AttributeKey };
}

/**
 * Validates if the provided value is a valid AttributeSyntax.
 *
 * @param attributeSyntax - The attribute syntax to validate
 */
export function validateAttributeSyntax(attributeSyntax: unknown): ValidateResult<AttributeSyntax> {
	const objectValidation = validateObject(attributeSyntax);
	if (!objectValidation.valid) return objectValidation;

	return { valid: true, value: objectValidation.value as AttributeSyntax };
}

/**
 *  Validates if the provided value is a valid AttributeDescription.
 *
 * @param attributeDescription - The attribute description to validate
 */
export function validateAttributeDescription(attributeDescription: unknown): ValidateResult<AttributeDescription> {
	const stringValidation = validateString(attributeDescription);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value as AttributeDescription };
}

/** * Validates if the provided value is a valid AttributeCategory.
 *
 * @param attributeCategory - The attribute category to validate
 */
export function validateAttributeCategory(attributeCategory: unknown): ValidateResult<AttributeCategory> {
	const stringValidation = validateString(attributeCategory);
	if (!stringValidation.valid) return stringValidation;

	return { valid: true, value: stringValidation.value as AttributeCategory };
}

/**
 *  Validates if the provided value is a valid AttributeDefinition.
 *
 * @param attributeDefinition - The attribute definition to validate
 */
export function validateAttributeDefinition(attributeDefinition: unknown): ValidateResult<AttributeDefinition> {
	const objectValidation = validateObject(attributeDefinition, ['key', 'syntax', 'description', 'category']);
	if (!objectValidation.valid) return objectValidation;

	const keyValidation = validateAttributeKey(objectValidation.value.key);
	if (!keyValidation.valid) return keyValidation;

	const syntaxValidation = validateAttributeSyntax(objectValidation.value.syntax);
	if (!syntaxValidation.valid) return syntaxValidation;

	const descriptionValidation = validateAttributeDescription(objectValidation.value.description);
	if (!descriptionValidation.valid) return descriptionValidation;

	const categoryValidation = validateAttributeCategory(objectValidation.value.category);
	if (!categoryValidation.valid) return categoryValidation;

	return { valid: true, value: objectValidation.value as unknown as AttributeDefinition };
}

/**
 * Checks if the value is a valid non-empty string that can be used as an HTML attribute value.
 *
 * @param attributeValue - The attribute value to validate
 */
export function validateAttributeValue(attributeValue: unknown): ValidateResult<AttributeValue> {
	if (attributeValue === '') return { valid: true, value: '' };

	const validation = validateString(attributeValue);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as AttributeValue };
}
