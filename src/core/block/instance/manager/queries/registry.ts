// Stores
import { useBlockStore } from '@/src/core/block/store';

// Types
import type { BlockDefinition, BlockID, BlockType, BlockAllowedStyles, BlockAllowedAttributes } from '@/src/core/block/instance/types';
import type { ElementTag } from '@/src/core/block/element/types';
import type { StyleKey } from '@/src/core/block/style/core/types';
import type { AttributeKey } from '@/src/core/block/attribute/types';
import type { ReactNode } from 'react';

// Helpers
import { fetchBlock, fetchRegisteredBlock, fetchRegisteredBlocks } from '@/src/core/block/instance/helper/fetch';
import { canBlockMoveInto } from '@/src/core/block/instance/helper/hierarchy';
import { validateBlockTag, validateBlockType, validateBlockID } from '@/src/core/block/instance/helper/validate';
import { validateAttributeKey } from '@/src/core/block/attribute/helper';
import { validateStyleKey } from '@/src/core/block/style/helper';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';

/**
 * Checks if a child block type is permitted within a parent block type.
 * @param parentTag - The parent block tag
 * @param childTag - The child block tag to check
 * @returns True if child is permitted, false otherwise
 * @example
 * const allowed = canBlockAcceptChild('container', 'text'); → true
 */
export function canBlockAcceptChild(parentTag: ElementTag, childTag: ElementTag): boolean {
	const safeParams = new ValidationPipeline('[BlockQueries → canBlockAcceptChild]')
		.validate({
			parentTag: validateBlockTag(parentTag),
			childTag: validateBlockTag(childTag),
		})
		.execute();
	if (!safeParams) return false;

	return canBlockMoveInto(safeParams.parentTag, safeParams.childTag);
}

/**
 * Checks if a block type can have children based on its allowedContent property.
 * @param blockID - The block ID to check
 * @returns True if the block type can have children, false otherwise
 * @example
 * const canHaveChildren = canBlockHaveChildren('block-123'); → true
 */
export function canBlockHaveChildren(blockID: BlockID): boolean {
	const blockStore = useBlockStore.getState();
	const safeParams = new ValidationPipeline('[BlockQueries → canBlockHaveChildren]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.fetch((data) => ({
			blockInstance: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.fetch((data) => ({
			blockDefinition: fetchRegisteredBlock(data.blockInstance.type),
		}))
		.execute();
	if (!safeParams) return false;

	// If allowedContent is undefined or null, the block can have any content
	if (safeParams.blockDefinition.allowedContent == null) return true;

	return safeParams.blockDefinition.allowedContent.length > 0;
}

/**
 * Checks if a block type can have styles based on its allowedStyles property.
 * @param blockID - The block ID to check
 * @returns True if the block type can have styles, false otherwise
 * @example
 * const canHaveStyles = canBlockHaveStyles('block-123'); → true
 */
export function canBlockHaveStyles(blockID: BlockID): boolean {
	const blockStore = useBlockStore.getState();
	const safeParams = new ValidationPipeline('[BlockQueries → canBlockHaveStyles]')
		.validate({ blockID: validateBlockID(blockID) })
		.fetch((data) => ({
			blockInstance: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.fetch((data) => ({
			blockDefinition: fetchRegisteredBlock(data.blockInstance.type),
		}))
		.execute();
	if (!safeParams) return false;

	// If allowedStyles is undefined or null, the block can have any styles
	if (safeParams.blockDefinition.allowedStyles == null) return true;

	return safeParams.blockDefinition.allowedStyles.length > 0;
}

/**
 * Checks if a block type can have a specific style based on its allowedStyles property.
 * @param blockID - The block ID to check
 * @param styleKey - The style key to check
 * @returns True if the block type can have the specific style, false otherwise
 * @example
 * const canHaveStyle = canBlockHaveStyle('block-123', 'color'); → true
 */
export function canBlockHaveStyle(blockID: BlockID, styleKey: StyleKey): boolean {
	const blockStore = useBlockStore.getState();
	const safeParams = new ValidationPipeline('[BlockQueries → canBlockHaveStyle]')
		.validate({
			blockID: validateBlockID(blockID),
			styleKey: validateStyleKey(styleKey),
		})
		.fetch((data) => ({
			blockInstance: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.fetch((data) => ({
			blockDefinition: fetchRegisteredBlock(data.blockInstance.type),
		}))
		.execute();
	if (!safeParams) return false;

	// If allowedStyles is undefined or null, the block can have any styles
	if (safeParams.blockDefinition.allowedStyles == null) return true;

	return safeParams.blockDefinition.allowedStyles.includes(safeParams.styleKey);
}

/**
 * Checks if a block type can have attributes based on its allowedAttributes property.
 * @param blockID - The block ID to check
 * @returns True if the block type can have attributes, false otherwise
 * @example
 * const canHaveAttributes = canBlockHaveAttributes('block-123'); → true
 */
export function canBlockHaveAttributes(blockID: BlockID): boolean {
	const blockStore = useBlockStore.getState();
	const safeParams = new ValidationPipeline('[BlockQueries → canBlockHaveAttributes]')
		.validate({ blockID: validateBlockID(blockID) })
		.fetch((data) => ({
			blockInstance: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.fetch((data) => ({
			blockDefinition: fetchRegisteredBlock(data.blockInstance.type),
		}))
		.execute();
	if (!safeParams) return false;

	// If allowedAttributes is undefined or null, the block can have any attributes
	if (safeParams.blockDefinition.allowedAttributes == null) return true;

	return safeParams.blockDefinition.allowedAttributes.length > 0;
}

/**
 * Checks if a block type can have a specific attribute based on its allowedAttributes property.
 * @param blockID - The block ID to check
 * @param attributeKey - The attribute key to check
 * @returns True if the block type can have the specific attribute, false otherwise
 * @example
 * const canHaveAttribute = canBlockHaveAttribute('block-123', 'fontSize'); → true
 */
export function canBlockHaveAttribute(blockID: BlockID, attributeKey: AttributeKey): boolean {
	const blockStore = useBlockStore.getState();
	const safeParams = new ValidationPipeline('[BlockQueries → canBlockHaveAttribute]')
		.validate({
			blockID: validateBlockID(blockID),
			attributeKey: validateAttributeKey(attributeKey),
		})
		.fetch((data) => ({
			blockInstance: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.fetch((data) => ({
			blockDefinition: fetchRegisteredBlock(data.blockInstance.type),
		}))
		.execute();
	if (!safeParams) return false;

	// If allowedAttributes is undefined or null, the block can have any attributes
	if (safeParams.blockDefinition.allowedAttributes == null) return true;

	return safeParams.blockDefinition.allowedAttributes.includes(safeParams.attributeKey);
}

/**
 * Gets all registered block definitions from the registry.
 * @returns Record of all registered block definitions keyed by type
 * @example
 * const blocks = getRegisteredBlocks(); → { 'text': BlockDefinition, 'container': BlockDefinition }
 */
export function getRegisteredBlocks(): Record<string, BlockDefinition> | undefined {
	const safeParams = new ValidationPipeline('[BlockQueries → getRegisteredBlocks]')
		.fetch(() => ({
			registeredBlocks: fetchRegisteredBlocks(),
		}))
		.execute();
	if (!safeParams) return undefined;

	return safeParams.registeredBlocks;
}

/**
 * Gets a specific registered block definition by type.
 * @param blockType - The block type to retrieve
 * @returns The block definition or undefined if not found
 * @example
 * const blockDef = getRegisteredBlock('text'); → BlockDefinition | undefined
 */
export function getRegisteredBlock(blockType: BlockType): BlockDefinition | undefined {
	const safeParams = new ValidationPipeline('[BlockQueries → getRegisteredBlock]')
		.validate({ blockType: validateBlockType(blockType) })
		.fetch((data) => ({
			registeredBlocks: fetchRegisteredBlock(data.blockType),
		}))
		.execute();
	if (!safeParams) return;

	return safeParams.registeredBlocks;
}

/**
 * Get a block type's icon from the registry.
 * @param blockType - The block type to get the icon for
 * @returns The block's icon component or null if not found or type is undefined
 * @example
 * const icon = getBlockIcon('text'); → <TextIcon />
 */
export function getBlockIcon(blockType: BlockType): ReactNode | undefined {
	const safeParams = new ValidationPipeline('[BlockQueries → getBlockIcon]')
		.validate({ blockType: validateBlockType(blockType) })
		.fetch((data) => ({
			blockDefinition: fetchRegisteredBlock(data.blockType),
		}))
		.execute();
	if (!safeParams) return;

	return safeParams.blockDefinition.icon;
}

/**
 * Get a block type's render function from the registry.
 * @param blockType - The block type to get the render function for
 * @returns The block's render function or undefined if not found or type is undefined
 * @example
 * const render = getBlockRender('text'); → <TextBlock ... />
 */
export function getBlockRender(blockType: BlockType) {
	const safeParams = new ValidationPipeline('[BlockQueries → getBlockRender]')
		.validate({ blockType: validateBlockType(blockType) })
		.fetch((data) => ({
			blockDefinition: fetchRegisteredBlock(data.blockType),
		}))
		.execute();
	if (!safeParams) return;

	return safeParams.blockDefinition.render;
}

/**
 * Gets the available HTML element tags for a specific block type.
 * @param blockType - The block type to get tags for
 * @returns Array of available HTML element tags for the block type, or undefined if block type not found
 * @example
 * const tags = getBlockTags('container'); → ['div', 'section', 'article', 'aside', 'nav']
 */
export function getBlockTags(blockType: BlockType): ElementTag[] | undefined {
	const safeParams = new ValidationPipeline('[BlockQueries → getBlockTags]')
		.validate({ blockType: validateBlockType(blockType) })
		.fetch((data) => ({
			blockDefinition: fetchRegisteredBlock(data.blockType),
		}))
		.execute();
	if (!safeParams) return;

	return safeParams.blockDefinition.tags;
}

/**
 * Gets the allowed styles for a specific block type.
 * @param blockType - The block type to get allowed styles for
 * @returns Array of allowed styles for the block type, or undefined if block type not found
 * @example
 * const styles = getBlockAllowedStyles('text'); → ['color', 'font-size', 'margin']
 */
export function getBlockAllowedStyles(blockType: BlockType): BlockAllowedStyles | undefined {
	const safeParams = new ValidationPipeline('[BlockQueries → getBlockAllowedStyles]')
		.validate({ blockType: validateBlockType(blockType) })
		.fetch((data) => ({
			blockDefinition: fetchRegisteredBlock(data.blockType),
		}))
		.execute();
	if (!safeParams) return;

	return safeParams.blockDefinition.allowedStyles;
}

/**
 * Gets the allowed attributes for a specific block type.
 * @param blockType - The block type to get allowed attributes for
 * @returns Array of allowed attributes for the block type, or undefined if block type not found
 * @example
 * const attributes = getBlockAllowedAttributes('text'); → ['id', 'class', 'style']
 */
export function getBlockAllowedAttributes(blockType: BlockType): BlockAllowedAttributes | undefined {
	const safeParams = new ValidationPipeline('[BlockQueries → getBlockAllowedAttributes]')
		.validate({ blockType: validateBlockType(blockType) })
		.fetch((data) => ({
			blockDefinition: fetchRegisteredBlock(data.blockType),
		}))
		.execute();
	if (!safeParams) return;

	return safeParams.blockDefinition.allowedAttributes;
}
