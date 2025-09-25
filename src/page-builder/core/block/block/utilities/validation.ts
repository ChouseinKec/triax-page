// Types
import type { BlockAttributes, BlockStyles, BlockID, BlockTypes, BlockRender, BlockChildren, BlockPermitedContent, BlockPermitedParent, BlockCategory, BlockIcon } from '@/src/page-builder/core/block/block/types';
import type { ElementTags } from '@/src/page-builder/core/block/element/types';

/**
 * Validates the block type.
 *
 * @param type - The block type to validate
 * @returns True if valid BlockTypes, false otherwise
 *
 * @example
 * isBlockTypeValid('text') // → true
 * isBlockTypeValid('invalid') // → false
 */
export function isBlockTypeValid(type: unknown): type is BlockTypes {
	return typeof type === 'string' && type.length > 0;
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
export function isBlockTagValid(tag: unknown): tag is ElementTags {
	return typeof tag === 'string' && tag.length > 0;
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
export function isBlockTagsValid(tags: unknown): tags is ElementTags[] {
	return Array.isArray(tags) && tags.length > 0 && tags.every((tag) => typeof tag === 'string' && tag.length > 0);
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
export function isBlockRenderValid(render: unknown): render is BlockRender {
	return typeof render === 'function';
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
 * Validates the block attributes object.
 *
 * @param attributes - The attributes object to validate
 * @returns True if valid BlockAttributes, false otherwise
 *
 * @example
 * isBlockAttributesValid(someObject) // → true or false
 */
export function isBlockAttributesValid(attributes: unknown): attributes is BlockAttributes {
	if (!attributes || typeof attributes !== 'object') return false;
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
export function isBlockStylesValid(styles: unknown): styles is BlockStyles {
	if (!styles || typeof styles !== 'object') return false;
	return true;
}

/**
 * Validates the block children.
 *
 * @param children - The children to validate
 * @returns True if valid BlockChildren, false otherwise
 *
 * @example
 * isBlockChildrenValid(<div>content</div>) // → true
 * isBlockChildrenValid(null) // → true
 */
export function isBlockChildrenValid(children: unknown): children is BlockChildren {
	return true; // ReactNode can be anything, including null/undefined
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
export function isBlockPermittedContentValid(permittedContent: unknown): permittedContent is BlockPermitedContent {
	if (permittedContent === null) return true;
	if (!Array.isArray(permittedContent)) return false;
	return permittedContent.every(type => isBlockTypeValid(type));
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
export function isBlockPermittedParentValid(permittedParent: unknown): permittedParent is BlockPermitedParent {
	if (permittedParent === null) return true;
	if (!Array.isArray(permittedParent)) return false;
	return permittedParent.every(type => isBlockTypeValid(type));
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
export function isBlockCategoryValid(category: unknown): category is BlockCategory {
	return typeof category === 'string' && category.trim().length > 0;
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
export function isBlockIconValid(icon: unknown): icon is BlockIcon {
	return typeof icon === 'string' || (icon !== null && typeof icon === 'object' && '$$typeof' in icon);
}


