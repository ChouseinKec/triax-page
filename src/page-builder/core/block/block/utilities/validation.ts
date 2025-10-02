// Types
import type { BlockInstance, BlockDefinition, BlockAttributes, BlockStyles, BlockID, BlockType, BlockRender, BlockPermitedContent, BlockPermitedParent, BlockCategory, BlockIcon } from '@/src/page-builder/core/block/block/types';
import type { ElementTags } from '@/src/page-builder/core/block/element/types';

export function isBlockInstanceValid(blockInstance: unknown): blockInstance is Record<keyof BlockInstance, unknown> {
	return (
		typeof blockInstance === 'object' && //
		blockInstance !== null &&
		'id' in blockInstance &&
		'type' in blockInstance &&
		'parentID' in blockInstance &&
		'contentIDs' in blockInstance &&
		'attributes' in blockInstance &&
		'styles' in blockInstance
	);
}

export function isBlockDefinitionValid(blockDefinition: unknown): blockDefinition is Record<keyof BlockDefinition, unknown> {
	return (
		typeof blockDefinition === 'object' && //
		blockDefinition !== null &&
		'type' in blockDefinition &&
		'tags' in blockDefinition &&
		'permittedContent' in blockDefinition &&
		'permittedParent' in blockDefinition &&
		'icon' in blockDefinition &&
		'category' in blockDefinition &&
		'render' in blockDefinition
	);
}

/**
 * Validates the block ID.
 *
 * @param blockID - The block ID to validate
 * @return True if valid BlockID, false otherwise
 *
 * @example
 * isBlockIDValid(someValue) // → true or false
 */
export function isBlockIDValid(blockID: unknown): blockID is BlockID {
	return typeof blockID === 'string' && blockID.trim().length > 0;
}

/**
 * Validates the block tag.
 *
 * @param tag - The block tag to validate
 * @returns True if valid ElementTags, false otherwise
 *
 * @example
 * isBlockTagValid('div') // → true
 * isBlockTagValid('invalid') // → false
 */
export function isBlockTagValid(blockTag: unknown): blockTag is ElementTags {
	return typeof blockTag === 'string' && blockTag.length > 0;
}

/**
 * Validates the block type.
 *
 * @param type - The block type to validate
 * @returns True if valid BlockType, false otherwise
 *
 * @example
 * isBlockTypeValid('text') // → true
 * isBlockTypeValid('invalid') // → false
 */
export function isBlockTypeValid(blockType: unknown): blockType is BlockType {
	return typeof blockType === 'string' && blockType.length > 0;
}

/**
 * Validates the block tags array.
 *
 * @param tags - The block tags array to validate
 * @returns True if valid ElementTags array, false otherwise
 *
 * @example
 * isBlockTagsValid(['div', 'span']) // → true
 * isBlockTagsValid([]) // → false
 */
export function isBlockTagsValid(blockTags: unknown): blockTags is ElementTags[] {
	return Array.isArray(blockTags) && blockTags.length > 0 && blockTags.every((blockTag) => typeof blockTag === 'string' && blockTag.length > 0);
}

/**
 * Validates the block render function.
 *
 * @param render - The block render function to validate
 * @returns True if valid BlockRender function, false otherwise
 *
 * @example
 * isBlockRenderValid((instance, children) => <div>{children}</div>) // → true
 * isBlockRenderValid('not-a-function') // → false
 */
export function isBlockRenderValid(blockRender: unknown): blockRender is BlockRender {
	return typeof blockRender === 'function';
}

/**
 * Validates the block attributes object.
 *
 * @param attributes - The attributes object to validate
 * @returns True if valid BlockAttributes, false otherwise
 *
 * @example
 * isBlockAttributesValid(someObject) // → true or false
 */
export function isBlockAttributesValid(blockAttributes: unknown): blockAttributes is BlockAttributes {
	if (!blockAttributes || typeof blockAttributes !== 'object') return false;
	return true;
}

/**
 * Validates the block styles object.
 *
 * @param styles - The styles object to validate
 * @returns True if valid BlockStyles, false otherwise
 *
 * @example
 * isBlockStylesValid(someObject) // → true or false
 */
export function isBlockStylesValid(blockStyles: unknown): blockStyles is BlockStyles {
	if (!blockStyles || typeof blockStyles !== 'object') return false;
	return true;
}

/**
 * Validates the block permitted content.
 *
 * @param permittedContent - The permitted content to validate
 * @returns True if valid BlockPermitedContent, false otherwise
 *
 * @example
 * isBlockPermittedContentValid(['text', 'container']) // → true
 * isBlockPermittedContentValid(null) // → true
 * isBlockPermittedContentValid('invalid') // → false
 */
export function isBlockPermittedContentValid(blockPermittedContent: unknown): blockPermittedContent is BlockPermitedContent {
	if (blockPermittedContent === null) return true;
	if (!Array.isArray(blockPermittedContent)) return false;
	return blockPermittedContent.every((type) => isBlockTypeValid(type));
}

/**
 * Validates the block permitted parent.
 *
 * @param permittedParent - The permitted parent to validate
 * @returns True if valid BlockPermitedParent, false otherwise
 *
 * @example
 * isBlockPermittedParentValid(['container']) // → true
 * isBlockPermittedParentValid(null) // → true
 * isBlockPermittedParentValid('invalid') // → false
 */
export function isBlockPermittedParentValid(blockPermittedParent: unknown): blockPermittedParent is BlockPermitedParent {
	if (blockPermittedParent === null) return true;
	if (!Array.isArray(blockPermittedParent)) return false;
	return blockPermittedParent.every((type) => isBlockTypeValid(type));
}

/**
 * Validates the block category.
 *
 * @param category - The category to validate
 * @returns True if valid BlockCategory, false otherwise
 *
 * @example
 * isBlockCategoryValid('layout') // → true
 * isBlockCategoryValid('') // → false
 */
export function isBlockCategoryValid(blockCategory: unknown): blockCategory is BlockCategory {
	return typeof blockCategory === 'string' && blockCategory.trim().length > 0;
}

/**
 * Validates the block icon.
 *
 * @param icon - The icon to validate
 * @returns True if valid BlockIcon, false otherwise
 *
 * @example
 * isBlockIconValid('icon-name') // → true
 * isBlockIconValid(<IconComponent />) // → true
 * isBlockIconValid(123) // → false
 */
export function isBlockIconValid(blockIcon: unknown): blockIcon is BlockIcon {
	return typeof blockIcon === 'string' || (blockIcon !== null && typeof blockIcon === 'object' && '$$typeof' in blockIcon);
}
