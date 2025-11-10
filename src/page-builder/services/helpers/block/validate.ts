// Types
import type { BlockType, BlockID, BlockInstance, BlockDefinition, BlockRender, BlockPermitedContent, BlockCategory, BlockIcon, BlockAttributes, BlockStyles } from '@/src/page-builder/core/block/block/types';
import type { ElementTag } from '@/src/page-builder/core/block/element/types';
import type { AttributeKey, AttributeValue } from '@/src/page-builder/core/block/attribute/types';
import type { StyleKey, StyleValue } from '@/src/page-builder/core/block/style/types/';
import type { ValidateResult } from '@/src/shared/types/result';

// Constants
import { ELEMENT_DEFINITIONS } from '@/src/page-builder/core/block/element/constants';
import { ATTRIBUTE_DEFINITIONS } from '@/src/page-builder/core/block/attribute/constants';
import { STYLE_DEFINITIONS, DEFAULT_VALUE_SEPARATORS } from '@/src/page-builder/core/block/style/constants';

// Utilities
import { splitAdvanced } from '@/src/shared/utilities/string';
import { getValueTokens } from '@/src/page-builder/core/block/style/utilities';

// Helpers
import { validateString, validateArray, validateFunction, validateObject, validateElement } from '@/src/page-builder/services/helpers/shared';

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

	if (!Object.keys(ELEMENT_DEFINITIONS).includes(validation.value as ElementTag)) {
		return { valid: false, message: `Invalid block tag: expected a valid HTML element tag, got "${validation.value}"` };
	}

	return { valid: true, value: validation.value as ElementTag };
}

/**
 * Checks if all tags in the array are valid HTML element tags.
 *
 * @param blockTags - The array of block tags to validate
 * @returns ValidateResult containing validity and the validated ElementTag array if all tags are valid
 *
 * @example
 * validateBlockTags(['div', 'span']) → { valid: true, value: ['div', 'span'] }
 */
export function validateBlockTags(blockTags: unknown): ValidateResult<ElementTag[]> {
	const validation = validateArray(blockTags);
	if (!validation.valid) return validation;

	for (const tag of validation.value) {
		const tagValidation = validateBlockTag(tag);
		if (!tagValidation.valid) return { valid: false, message: `Invalid block tags: '${tag}' is not a valid HTML element tag` };
	}

	return { valid: true, value: validation.value as ElementTag[] };
}

/**
 * Checks if the render configuration is a valid function that can render the block.
 *
 * @param blockRender - The block render configuration to validate
 * @returns ValidateResult containing validity and the validated BlockRender function if valid
 *
 * @example
 * validateBlockRender(() => <div>Hello</div>) → { valid: true, value: () => <div>Hello</div> }
 */
export function validateBlockRender(blockRender: unknown): ValidateResult<BlockRender> {
	const validation = validateFunction(blockRender);
	if (!validation.valid) return { valid: false, message: `Invalid block render: expected a function, received ${typeof blockRender}` };
	return { valid: true, value: blockRender as BlockRender };
}

/**
 * Checks if all content types in the array are valid block types that this block can contain.
 *
 * @param blockPermittedContent - The array of permitted content types to validate
 * @returns ValidateResult containing validity and the validated BlockPermitedContent array if all types are valid
 *
 * @example
 * validateBlockPermittedContent(['text', 'image']) → { valid: true, value: ['text', 'image'] }
 */
export function validateBlockPermittedContent(blockPermittedContent: unknown): ValidateResult<BlockPermitedContent> {
	if (blockPermittedContent === null) {
		return { valid: true, value: [] };
	}

	if (!Array.isArray(blockPermittedContent)) {
		return { valid: false, message: `Invalid block permitted content: expected an array or null, got ${typeof blockPermittedContent}` };
	}

	for (const type of blockPermittedContent) {
		const typeValidation = validateBlockType(type);
		if (!typeValidation.valid) return typeValidation;
	}

	return { valid: true, value: blockPermittedContent as BlockPermitedContent };
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
 * Checks if the definition has all required properties (type, tags, render, permittedContent, icon, category)
 * and that each property is valid according to its respective validation rules.
 *
 * @param blockDefinition - The block definition object to validate
 * @returns ValidateResult containing validity and the validated BlockDefinition if valid
 *
 * @example
 * validateBlockDefinition({type: 'text',tags: ['span'],render: () => <span>Text</span>,permittedContent: [],icon: <TextIcon />,category: 'content'}) → { valid: true, value: {...} }
 */
export function validateBlockDefinition(blockDefinition: unknown): ValidateResult<BlockDefinition> {
	const validation = validateObject(blockDefinition, ['type', 'tags', 'permittedContent', 'icon', 'category', 'render']);
	if (!validation.valid) return { valid: false, message: `Invalid block definition: ${validation.message}` };

	const typeValidation = validateBlockType(validation.value.type);
	if (!typeValidation.valid) return { valid: false, message: typeValidation.message };

	const tagsValidation = validateBlockTags(validation.value.tags);
	if (!tagsValidation.valid) return { valid: false, message: tagsValidation.message };

	const renderValidation = validateBlockRender(validation.value.render);
	if (!renderValidation.valid) return { valid: false, message: renderValidation.message };

	const permittedContentValidation = validateBlockPermittedContent(validation.value.permittedContent);
	if (!permittedContentValidation.valid) return { valid: false, message: permittedContentValidation.message };

	const categoryValidation = validateBlockCategory(validation.value.category);
	if (!categoryValidation.valid) return { valid: false, message: categoryValidation.message };

	const iconValidation = validateBlockIcon(validation.value.icon);
	if (!iconValidation.valid) return { valid: false, message: iconValidation.message };

	return { valid: true, value: validation.value as unknown as BlockDefinition };
}

/**
 * Checks if the key is a valid HTML attribute key from the predefined attribute definitions.
 *
 * @param attributeKey - The HTML attribute key to validate
 * @returns ValidateResult containing validity and the validated AttributeKey if valid
 *
 * @example
 * validateAttributeKey('className') → { valid: true, value: 'className' }
 */
export function validateAttributeKey(attributeKey: unknown): ValidateResult<AttributeKey> {
	const validation = validateString(attributeKey);
	if (!validation.valid) return validation;

	// Check if the key is a recognized HTML attribute
	if (!(validation.value in ATTRIBUTE_DEFINITIONS)) {
		return { valid: false, message: `Invalid attribute key: '${validation.value}' is not a recognized HTML attribute` };
	}

	return { valid: true, value: validation.value as AttributeKey };
}

/**
 * Checks if the value is a valid non-empty string that can be used as an HTML attribute value.
 *
 * @param attributeValue - The attribute value to validate
 * @returns ValidateResult containing validity and the validated AttributeValue if valid
 *
 * @example
 * validateAttributeValue('my-class') → { valid: true, value: 'my-class' }
 */
export function validateAttributeValue(attributeValue: unknown): ValidateResult<AttributeValue> {
	if (attributeValue === '') return { valid: true, value: '' };

	const validation = validateString(attributeValue);
	if (!validation.valid) return validation;

	return { valid: true, value: validation.value as AttributeValue };
}

/**
 * Validates a CSS style key for block style operations.
 * Checks if the key is a valid CSS property key from the predefined style definitions.
 *
 * @param styleKey - The CSS style key to validate
 * @returns ValidateResult containing validity and the validated StyleKey if valid
 *
 * @example
 * validateStyleKey('display') → { valid: true, value: 'display' }
 */
export function validateStyleKey(styleKey: unknown): ValidateResult<StyleKey> {
	const validation = validateString(styleKey);
	if (!validation.valid) return validation;

	// Check if the key is a recognized CSS property
	if (!(validation.value in STYLE_DEFINITIONS)) return { valid: false, message: `Invalid style key: '${validation.value}' is not a recognized CSS property` };

	return { valid: true, value: validation.value as StyleKey };
}

/**
 * Validates a CSS style value for block style operations.
 * Checks if the value is valid for the given CSS property according to the style definitions and syntax rules.
 *
 * @param styleKey - The CSS property key this value is for
 * @param styleValue - The CSS style value to validate
 * @returns ValidateResult containing validity and the validated StyleValue if valid
 *
 * @example
 * validateStyleValue('display', 'block') → { valid: true, value: 'display', 'block' }
 */
export function validateStyleValue(styleKey: unknown, styleValue: unknown): ValidateResult<StyleValue> {
	// Validate the style key first
	const keyValidation = validateStyleKey(styleKey);
	if (!keyValidation.valid) return { valid: false, message: keyValidation.message };

	// Empty strings are valid CSS values (used to clear/reset properties)
	if (styleValue === '') return { valid: true, value: '' };

	// Validate that the value is a non-empty string
	const valueValidation = validateString(styleValue);
	if (!valueValidation.valid) return { valid: false, message: valueValidation.message };

	// Fetch the property definition from the STYLE_DEFINITIONS
	const propertyDef = STYLE_DEFINITIONS[keyValidation.value];

	// Fetch the normalized syntax variations for the property
	const {syntaxNormalized} = propertyDef;
	if (!syntaxNormalized) return { valid: false, message: `Invalid style property: no syntax defined for '${styleKey}'` };

	// Split the value into its components
	const values = splitAdvanced(valueValidation.value, DEFAULT_VALUE_SEPARATORS);

	// Convert the values to their token representations
	const valueTokens = getValueTokens(values).join(' ');
	if (valueTokens.length === 0) return { valid: false, message: `Invalid style value: '${styleValue}' contains no valid tokens for property '${styleKey}'` };

	// Check if the tokenized value matches any of the valid syntax patterns
	const isValid = syntaxNormalized.some((syntax) => syntax === valueTokens);

	if (!isValid) return { valid: false, message: `Invalid style value: '${styleValue}' is not valid for property '${styleKey}'` };

	return { valid: true, value: styleValue as StyleValue };
}