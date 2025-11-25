// Types
import type { BlockType, BlockID, BlockInstance, BlockDefinition, BlockRender, BlockAllowedChildren, BlockCategory, BlockIcon, BlockAttributes, BlockStyles } from '@/src/core/block/instance/types';
import type { ElementTag } from '@/src/core/block/element/types';
import type { ValidateResult } from '@/src/shared/types/result';

// Constants
import { getElementDefinitions } from '@/src/core/block/element/constants';

// Helpers
import { validateString, validateArray, validateFunction, validateObject, validateElement } from '@/src/shared/helpers';

/**
 * Checks if the ID is a valid non-empty string identifier.
 *
 * @param blockID - The block ID to validate
 * @returns ValidateResult containing validity and the validated BlockID if valid
 *
 * @example
 * validateBlockID('block-123') → { valid: true, value: 'block-123' }
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
 * @returns ValidateResult containing validity and the validated BlockType if valid
 *
 * @example
 * validateBlockType('text') → { valid: true, value: 'text' }
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
 * @returns ValidateResult containing validity and the validated ElementTag if valid
 *
 * @example
 * validateBlockTag('div') → { valid: true, value: 'div' }
 */
export function validateBlockTag(blockTag: unknown): ValidateResult<ElementTag> {
	const validation = validateString(blockTag);
	if (!validation.valid) return validation;

	if (!Object.keys(getElementDefinitions()).includes(validation.value as ElementTag)) {
		return { valid: false, message: `Invalid block tag: expected a valid HTML element tag, got "${validation.value}"` };
	}

	return { valid: true, value: validation.value as ElementTag };
}

/**
 * Checks if all availableTags in the array are valid HTML element availableTags.
 *
 * @param blockAllowedTags - The array of block availableTags to validate
 * @returns ValidateResult containing validity and the validated ElementTag array if all availableTags are valid
 *
 * @example
 * validateBlockAvailableTags(['div', 'span']) → { valid: true, value: ['div', 'span'] }
 */
export function validateBlockAvailableTags(blockTags: unknown): ValidateResult<ElementTag[]> {
	const validation = validateArray(blockTags);
	if (!validation.valid) return validation;

	for (const tag of validation.value) {
		const tagValidation = validateBlockTag(tag);
		if (!tagValidation.valid) return { valid: false, message: `Invalid block availableTags: '${tag}' is not a valid HTML element tag` };
	}

	return { valid: true, value: validation.value as ElementTag[] };
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
 * @returns ValidateResult containing validity and the validated BlockAllowedChildren array if all types are valid
 *
 * @example
 * validateBlockAllowedChildren(['text', 'image']) → { valid: true, value: ['text', 'image'] }
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
 * @returns ValidateResult containing validity and the validated BlockCategory if valid
 *
 * @example
 * validateBlockCategory('layout') → { valid: true, value: 'layout' }
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
 * @returns ValidateResult containing validity and the validated BlockIcon if valid
 *
 * @example
 * validateBlockIcon(<StarIcon />) → { valid: true, value: <StarIcon /> }
 */
export function validateBlockIcon(blockIcon: unknown): ValidateResult<BlockIcon> {
	const componentValidation = validateElement(blockIcon);
	if (componentValidation.valid) return { valid: true, value: componentValidation.value as BlockIcon };

	return { valid: false, message: `Invalid block icon: expected a React element, got ${typeof blockIcon}` };
}

/**
 * Checks if the attributes is a valid object containing HTML attributes for the block.
 *
 * @param blockAttributes - The block attributes object to validate
 * @returns ValidateResult containing validity and the validated BlockAttributes if valid
 *
 * @example
 * validateBlockAttributes({ className: 'my-class', id: 'block-1' }) → { valid: true, value: { className: 'my-class', id: 'block-1' } }
 */
export function validateBlockAttributes(blockAttributes: unknown): ValidateResult<BlockAttributes> {
	const validation = validateObject(blockAttributes);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as BlockAttributes };
}

/**
 * Checks if the styles is a valid object containing CSS styles for the block.
 *
 * @param blockStyles - The block styles object to validate
 * @returns ValidateResult containing validity and the validated BlockStyles if valid
 *
 * @example
 * validateBlockStyles({ color: 'red', fontSize: '14px' }) → { valid: true, value: { color: 'red', fontSize: '14px' } }
 */
export function validateBlockStyles(blockStyles: unknown): ValidateResult<BlockStyles> {
	const validation = validateObject(blockStyles);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as BlockStyles };
}

/**
 * Checks if the instance has required properties (id, type, parentID, contentIDs, attributes, styles)
 * and that each property is valid.
 *
 * @param blockInstance - The block instance to validate
 * @returns ValidateResult<BlockInstance>
 *
 * @example
 * validateBlockInstance({ id: 'block-1', type: 'text', parentID: 'root', contentIDs: [], attributes: {}, styles: {} }) → { valid: true, value: {...} }
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
 * @returns ValidateResult containing validity and the validated BlockDefinition if valid
 *
 * @example
 * validateBlockDefinition({type: 'text',availableTags: ['span'],render: () => <span>Text</span>,allowedChildren: [],icon: <TextIcon />,category: 'content'}) → { valid: true, value: {...} }
 */
export function validateBlockDefinition(blockDefinition: unknown): ValidateResult<BlockDefinition> {
	const validation = validateObject(blockDefinition, ['type', 'defaultTag', 'icon', 'category', 'render', 'availableTags', 'allowedChildren']);
	if (!validation.valid) return { valid: false, message: `Invalid block definition: ${validation.message}` };

	const typeValidation = validateBlockType(validation.value.type);
	if (!typeValidation.valid) return { valid: false, message: typeValidation.message };

	const tagValidation = validateBlockTag(validation.value.defaultTag);
	if (!tagValidation.valid) return { valid: false, message: tagValidation.message };

	const allowedTagsValidation = validateBlockAvailableTags(validation.value.availableTags);
	if (!allowedTagsValidation.valid) return { valid: false, message: allowedTagsValidation.message };

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
