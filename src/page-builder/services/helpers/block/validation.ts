// Types
import type { BlockType, BlockID, BlockInstance, BlockDefinition, BlockRender, BlockPermitedContent, BlockPermitedParent, BlockCategory, BlockIcon, BlockAttributes, BlockStyles } from '@/src/page-builder/core/block/block/types';
import type { ElementTags } from '@/src/page-builder/core/block/element/types';
import type { ValidationResult } from '@/src/shared/types/result';

// Utilities
import { isBlockIDValid, isBlockInstanceValid, isBlockDefinitionValid, isBlockTypeValid, isBlockTagsValid, isBlockRenderValid, isBlockAttributesValid, isBlockStylesValid, isBlockPermittedContentValid, isBlockPermittedParentValid, isBlockCategoryValid, isBlockIconValid } from '@/src/page-builder/core/block/block/utilities';

/**
 * Validates a block ID for block operations.
 * Checks if the ID is a valid string identifier.
 *
 * @param blockID - The block ID to validate
 * @returns ValidationResult containing validity and the validated BlockID if valid
 *
 * @example
 * validateBlockID('block-123') → { valid: true, value: 'block-123' }
 */
export function validateBlockID(blockID: unknown): ValidationResult<BlockID> {
	if (!isBlockIDValid(blockID)) return { valid: false, message: `Block ID must be a valid string, got: ${blockID}` };
	return { valid: true, value: blockID as BlockID };
}

/**
 * Validates a block type for block operations.
 * Checks if the type is a registered and valid block type.
 *
 * @param blockType - The block type to validate
 * @returns ValidationResult containing validity and the validated BlockType if valid
 *
 * @example
 * validateBlockType('text') → { valid: true, value: 'text' }
 */
export function validateBlockType(blockType: unknown): ValidationResult<BlockType> {
	if (!isBlockTypeValid(blockType)) return { valid: false, message: `Invalid block type (${blockType})` };

	return { valid: true, value: blockType as BlockType };
}

/**
 * Validates block tags for block operations.
 * Checks if the tags are valid HTML element tags.
 *
 * @param blockTags - The block tags to validate
 * @returns ValidationResult containing validity and the validated ElementTags array if valid
 *
 * @example
 * validateBlockTags(['div', 'span']) → { valid: true, value: ['div', 'span'] }
 */
export function validateBlockTags(blockTags: unknown): ValidationResult<ElementTags[]> {
	if (!isBlockTagsValid(blockTags)) return { valid: false, message: `Invalid block tags (${JSON.stringify(blockTags)})` };
	return { valid: true, value: blockTags as ElementTags[] };
}

/**
 * Validates block render configuration for block operations.
 * Checks if the render config is valid for block rendering.
 *
 * @param blockRender - The block render configuration to validate
 * @returns ValidationResult containing validity and the validated BlockRender if valid
 *
 * @example
 * validateBlockRender({ component: MyComponent }) → { valid: true, value: { component: MyComponent } }
 */
export function validateBlockRender(blockRender: unknown): ValidationResult<BlockRender> {
	if (!isBlockRenderValid(blockRender)) return { valid: false, message: `Invalid block render (${typeof blockRender})` };
	return { valid: true, value: blockRender as BlockRender };
}

/**
 * Validates block permitted content for block operations.
 * Checks if the permitted content configuration is valid.
 *
 * @param blockPermittedContent - The block permitted content to validate
 * @returns ValidationResult containing validity and the validated BlockPermitedContent if valid
 *
 * @example
 * validateBlockPermittedContent(['text', 'image']) → { valid: true, value: ['text', 'image'] }
 */
export function validateBlockPermittedContent(blockPermittedContent: unknown): ValidationResult<BlockPermitedContent> {
	if (!isBlockPermittedContentValid(blockPermittedContent)) return { valid: false, message: `Invalid block permitted content (${JSON.stringify(blockPermittedContent)})` };
	return { valid: true, value: blockPermittedContent as BlockPermitedContent };
}

/**
 * Validates block permitted parent for block operations.
 * Checks if the permitted parent configuration is valid.
 *
 * @param blockPermittedParent - The block permitted parent to validate
 * @returns ValidationResult containing validity and the validated BlockPermitedParent if valid
 *
 * @example
 * validateBlockPermittedParent(['container']) → { valid: true, value: ['container'] }
 */
export function validateBlockPermittedParent(blockPermittedParent: unknown): ValidationResult<BlockPermitedParent> {
	if (!isBlockPermittedParentValid(blockPermittedParent)) return { valid: false, message: `Invalid block permitted parent (${JSON.stringify(blockPermittedParent)})` };
	return { valid: true, value: blockPermittedParent as BlockPermitedParent };
}

/**
 * Validates block category for block operations.
 * Checks if the category is a valid block category.
 *
 * @param blockCategory - The block category to validate
 * @returns ValidationResult containing validity and the validated BlockCategory if valid
 *
 * @example
 * validateBlockCategory('layout') → { valid: true, value: 'layout' }
 */
export function validateBlockCategory(blockCategory: unknown): ValidationResult<BlockCategory> {
	if (!isBlockCategoryValid(blockCategory)) return { valid: false, message: `Invalid block category (${blockCategory})` };
	return { valid: true, value: blockCategory as BlockCategory };
}

/**
 * Validates block icon for block operations.
 * Checks if the icon configuration is valid.
 *
 * @param blockIcon - The block icon to validate
 * @returns ValidationResult containing validity and the validated BlockIcon if valid
 *
 * @example
 * validateBlockIcon({ name: 'star', size: 16 }) → { valid: true, value: { name: 'star', size: 16 } }
 */
export function validateBlockIcon(blockIcon: unknown): ValidationResult<BlockIcon> {
	if (!isBlockIconValid(blockIcon)) return { valid: false, message: `Invalid block icon (${JSON.stringify(blockIcon)})` };
	return { valid: true, value: blockIcon as BlockIcon };
}

/**
 * Validates block attributes for block operations.
 * Checks if the attributes object is valid.
 *
 * @param blockAttributes - The block attributes to validate
 * @returns ValidationResult containing validity and the validated BlockAttributes if valid
 *
 * @example
 * validateBlockAttributes({ className: 'my-class' }) → { valid: true, value: { className: 'my-class' } }
 */
export function validateBlockAttributes(blockAttributes: unknown): ValidationResult<BlockAttributes> {
	if (!isBlockAttributesValid(blockAttributes)) return { valid: false, message: `Invalid block attributes (${JSON.stringify(blockAttributes)})` };

	return { valid: true, value: blockAttributes as BlockAttributes };
}

/**
 * Validates block styles for block operations.
 * Checks if the styles object is valid.
 *
 * @param blockStyles - The block styles to validate
 * @returns ValidationResult containing validity and the validated BlockStyles if valid
 *
 * @example
 * validateBlockStyles({ color: 'red' }) → { valid: true, value: { color: 'red' } }
 */
export function validateBlockStyles(blockStyles: unknown): ValidationResult<BlockStyles> {
	if (!isBlockStylesValid(blockStyles)) return { valid: false, message: `Invalid block styles (${JSON.stringify(blockStyles)})` };
	return { valid: true, value: blockStyles as BlockStyles };
}

/**
 * Validates a complete block instance for block operations.
 * Checks if the instance has valid type, attributes, and styles.
 *
 * @param blockInstance - The block instance to validate
 * @returns ValidationResult containing validity and the validated BlockInstance if valid
 *
 * @example
 * validateBlockInstance({ type: 'text', attributes: {}, styles: {} }) → { valid: true, value: { type: 'text', attributes: {}, styles: {} } }
 */
export function validateBlockInstance(blockInstance: unknown): ValidationResult<BlockInstance> {
	if (!isBlockInstanceValid(blockInstance)) return { valid: false, message: `Block must be an object with required properties, got: ${typeof blockInstance}` };

	const typeValidation = validateBlockType(blockInstance.type);
	if (!typeValidation.valid) return { valid: false, message: typeValidation.message };

	const attributesValidation = validateBlockAttributes(blockInstance.attributes);
	if (!attributesValidation.valid) return { valid: false, message: attributesValidation.message };

	const stylesValidation = validateBlockStyles(blockInstance.styles);
	if (!stylesValidation.valid) return { valid: false, message: stylesValidation.message };

	return { valid: true, value: blockInstance as BlockInstance };
}

/**
 * Validates a complete block definition for block operations.
 * Checks if the definition has all required valid properties including type, tags, render, etc.
 *
 * @param blockDefinition - The block definition to validate
 * @returns ValidationResult containing validity and the validated BlockDefinition if valid
 *
 * @example
 * validateBlockDefinition({ type: 'text', tags: ['span'], render: {}, permittedContent: [], permittedParent: [], category: 'content', icon: {} }) → { valid: true, value: {...} }
 */
export function validateBlockDefinition(blockDefinition: unknown): ValidationResult<BlockDefinition> {
	if (!isBlockDefinitionValid(blockDefinition)) return { valid: false, message: `Block definition must be an object with required properties, got: ${typeof blockDefinition}` };

	const typeValidation = validateBlockType(blockDefinition.type);
	if (!typeValidation.valid) return { valid: false, message: typeValidation.message };

	const tagsValidation = validateBlockTags(blockDefinition.tags);
	if (!tagsValidation.valid) return { valid: false, message: tagsValidation.message };

	const renderValidation = validateBlockRender(blockDefinition.render);
	if (!renderValidation.valid) return { valid: false, message: renderValidation.message };

	const permittedContentValidation = validateBlockPermittedContent(blockDefinition.permittedContent);
	if (!permittedContentValidation.valid) return { valid: false, message: permittedContentValidation.message };

	const permittedParentValidation = validateBlockPermittedParent(blockDefinition.permittedParent);
	if (!permittedParentValidation.valid) return { valid: false, message: permittedParentValidation.message };

	const categoryValidation = validateBlockCategory(blockDefinition.category);
	if (!categoryValidation.valid) return { valid: false, message: categoryValidation.message };

	const iconValidation = validateBlockIcon(blockDefinition.icon);
	if (!iconValidation.valid) return { valid: false, message: iconValidation.message };

	return { valid: true, value: blockDefinition as BlockDefinition };
}
