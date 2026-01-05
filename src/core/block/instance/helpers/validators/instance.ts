// Types
import type { BlockType, BlockID, BlockInstance, BlockDefinition, BlockRender, BlockAllowedChildren, BlockCategory, BlockIcon, BlockAttributes, BlockStyles } from '@/src/core/block/instance/types';
import type { ElementKey } from '@/src/core/block/element/types';
import type { ValidateResult } from '@/src/shared/types/result';


// Helpers
import { validateString, validateArray, validateFunction, validateObject, validateElement } from '@/src/shared/helpers';
import { validateBlockStyles } from '@/src/core/block/style/helpers/';
import { validateBlockAttributes } from '@/src/core/block/attribute/helpers/';

/**
 * Checks if the ID is a valid non-empty string identifier.
 *
 * @param blockID - The block ID to validate
 */
export function validateBlockID(blockID: unknown): ValidateResult<BlockID> {
	const validation = validateString(blockID);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as BlockID };
}

/**
 * Checks if the type is a valid non-empty string representing a registered block type.
 *
 * @param blockType - The block type to validate
 */
export function validateBlockType(blockType: unknown): ValidateResult<BlockType> {
	const validation = validateString(blockType);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as BlockType };
}

/**
 * Checks if the tag is a valid HTML element tag from the predefined element definitions.
 *
 * @param blockTag - The block tag to validate
 * @param availableTags - Optional array of available tags to check against
 */
export function validateBlockTag(blockTag: unknown, availableTags?: ElementKey[]): ValidateResult<ElementKey> {
	const validation = validateString(blockTag);
	if (!validation.valid) return validation;

	// if (!Object.keys(getElementDefinitions()).includes(validation.value as ElementKey)) {
	// 	return { valid: false, message: `Invalid block tag: expected a valid HTML element tag, got "${validation.value}"` };
	// }

	// If availableTags is provided, check that blockTag is included
	if (availableTags && !availableTags.includes(validation.value as ElementKey)) {
		return { valid: false, message: `Invalid block tag: '${validation.value}' is not in availableTags [${availableTags.join(', ')}]` };
	}

	return { valid: true, value: validation.value as ElementKey };
}

/**
 * Checks if all availableTags in the array are valid HTML element availableTags.
 *
 * @param blockAllowedTags - The array of block availableTags to validate
 */
export function validateBlockAvailableTags(blockTags: unknown): ValidateResult<ElementKey[]> {
	const validation = validateArray(blockTags);
	if (!validation.valid) return validation;

	for (const tag of validation.value) {
		const tagValidation = validateBlockTag(tag);
		if (!tagValidation.valid) return { valid: false, message: `Invalid block availableTags: '${tag}' is not a valid HTML element tag` };
	}

	return { valid: true, value: validation.value as ElementKey[] };
}

/**
 * Checks if the render configuration is a valid function that can render the block.
 * @param blockRender - The block render configuration to validate
 * @returns ValidateResult containing validity and the validated BlockRender function if valid
 */
export function validateBlockRender(blockRender: unknown): ValidateResult<BlockRender> {
	const validation = validateFunction(blockRender);
	if (!validation.valid) return { valid: false, message: `Invalid block render: expected a function, received ${typeof blockRender}` };
	return { valid: true, value: blockRender as BlockRender };
}

/**
 * Checks if all content types in the array are valid block types that this block can contain.
 *
 * @param allowedChildren - The array of permitted content types to validate
 */
export function validateBlockAllowedChildren(allowedChildren: unknown): ValidateResult<BlockAllowedChildren> {
	if (allowedChildren === null) {
		return { valid: true, value: [] };
	}

	if (!Array.isArray(allowedChildren)) {
		return { valid: false, message: `Invalid block allowed elements: expected an array or null, got ${typeof allowedChildren}` };
	}

	for (const type of allowedChildren) {
		const typeValidation = validateBlockType(type);
		if (!typeValidation.valid) return typeValidation;
	}

	return { valid: true, value: allowedChildren as BlockAllowedChildren };
}

/**
 * Checks if the category is a valid non-empty string representing a block category.
 *
 * @param blockCategory - The block category to validate
 */
export function validateBlockCategory(blockCategory: unknown): ValidateResult<BlockCategory> {
	const validation = validateString(blockCategory);
	if (!validation.valid) return validation;

	return { valid: true, value: blockCategory as BlockCategory };
}

/**
 * Checks if the icon is a valid React component.
 *
 * @param blockIcon - The block icon React component to validate
 */
export function validateBlockIcon(blockIcon: unknown): ValidateResult<BlockIcon> {
	const componentValidation = validateElement(blockIcon);
	if (componentValidation.valid) return { valid: true, value: componentValidation.value as BlockIcon };

	return { valid: false, message: `Invalid block icon: expected a React element, got ${typeof blockIcon}` };
}

/**
 * Checks if the instance has required properties (id, type, parentID, contentIDs, attributes, styles)
 * and that each property is valid.
 *
 * @param blockInstance - The block instance to validate
 */
export function validateBlockInstance(blockInstance: unknown): ValidateResult<BlockInstance> {
	const validation = validateObject(blockInstance, ['id', 'type', 'parentID', 'contentIDs', 'attributes', 'styles']);
	if (!validation.valid) return { valid: false, message: `Invalid block instance: ${validation.message}` };

	const typeValidation = validateBlockType(validation.value.type);
	if (!typeValidation.valid) return { valid: false, message: typeValidation.message };

	const attributesValidation = validateBlockAttributes(validation.value.attributes);
	if (!attributesValidation.valid) return { valid: false, message: attributesValidation.message };

	const stylesValidation = validateBlockStyles(validation.value.styles);
	if (!stylesValidation.valid) return { valid: false, message: stylesValidation.message };

	return { valid: true, value: validation.value as unknown as BlockInstance };
}

/**
 * Checks if the definition has all required properties (type, availableTags, render, allowedChildren, icon, category)
 * and that each property is valid according to its respective validation rules.
 *
 * @param blockDefinition - The block definition object to validate
 */
export function validateBlockDefinition(blockDefinition: unknown): ValidateResult<BlockDefinition> {
	const validation = validateObject(blockDefinition, ['type', 'defaultTag', 'icon', 'category', 'render', 'availableTags', 'allowedChildren']);
	if (!validation.valid) return { valid: false, message: `Invalid block definition: ${validation.message}` };

	const typeValidation = validateBlockType(validation.value.type);
	if (!typeValidation.valid) return { valid: false, message: typeValidation.message };

	const allowedTagsValidation = validateBlockAvailableTags(validation.value.availableTags);
	if (!allowedTagsValidation.valid) return { valid: false, message: allowedTagsValidation.message };

	const tagValidation = validateBlockTag(validation.value.defaultTag, allowedTagsValidation.value);
	if (!tagValidation.valid) return { valid: false, message: tagValidation.message };

	const renderValidation = validateBlockRender(validation.value.render);
	if (!renderValidation.valid) return { valid: false, message: renderValidation.message };

	const permittedContentValidation = validateBlockAllowedChildren(validation.value.allowedChildren);
	if (!permittedContentValidation.valid) return { valid: false, message: permittedContentValidation.message };

	const categoryValidation = validateBlockCategory(validation.value.category);
	if (!categoryValidation.valid) return { valid: false, message: categoryValidation.message };

	const iconValidation = validateBlockIcon(validation.value.icon);
	if (!iconValidation.valid) return { valid: false, message: iconValidation.message };

	return { valid: true, value: validation.value as unknown as BlockDefinition };
}
