// Stores
import { useBlockStore } from '@/src/core/block/store';

// Types
import type { BlockDefinition, BlockID, BlockType, BlockAllowedStyles, BlockAllowedAttributes, BlockDefinitionRecord } from '@/src/core/block/instance/types';
import type { ElementTag } from '@/src/core/block/element/types';
import type { StyleKey } from '@/src/core/block/style/types';
import type { AttributeKey } from '@/src/core/block/attribute/types';
import type { ReactNode } from 'react';

// Helpers
import { pickBlockInstance, pickBlockDefinition } from '@/src/core/block/instance/helper/pickers';
import { validateBlockTag, validateBlockType, validateBlockID } from '@/src/core/block/instance/helper/validators';
import { validateAttributeKey } from '@/src/core/block/attribute/helper';
import { validateStyleKey } from '@/src/core/block/style/helper';
import { isBlockChildAllowed, hasBlockForbiddenAncestor, doesBlockElementExceeds, doesBlockElementViolatesOrder } from '@/src/core/block/instance/helper/checkers';
import { fetchElementDefinition } from '@/src/core/block/element/helper/fetchers';

// Registry
import { getRegisteredBlocks } from '@/src/core/block/instance/registry';

// Constants
import { getElementDefinitions } from '@/src/core/block/element/constants';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

/**
 * Checks if a child block type is permitted within a parent block type.
 * @param parentTag - The parent block tag
 * @param childTag - The child block tag to check
 * @returns True if child is permitted, false otherwise
 * @example
 * const allowed = canBlockAcceptChild('container', 'text'); → true
 */
export function canBlockAcceptChild(parentBlockID: BlockID, childBlockTag: ElementTag): boolean {
	const blockStore = useBlockStore.getState();
	const safeParams = new ResultPipeline('[BlockQueries → canBlockAcceptChild]')
		.validate({
			parentBlock: validateBlockID(parentBlockID),
			childBlockTag: validateBlockTag(childBlockTag),
		})
		.pick((data) => ({
			parentBlockInstance: pickBlockInstance(data.parentBlock, useBlockStore.getState().allBlocks),
		}))
		.pick((data) => ({
			parentBlockDefinition: pickBlockDefinition(data.parentBlockInstance.type, getRegisteredBlocks()),
			childBlockDefinition: fetchElementDefinition(data.childBlockTag, getElementDefinitions()),
		}))
		.execute();
	if (!safeParams) return false;

	// Check allowed children
	const allowedRes = isBlockChildAllowed(safeParams.parentBlockDefinition, childBlockTag);
	if (!allowedRes.success) return false;
	if (!allowedRes.ok) return false;

	// Check forbidden ancestors
	const forbiddenRes = hasBlockForbiddenAncestor(safeParams.childBlockDefinition, safeParams.parentBlockInstance, blockStore.allBlocks);
	if (!forbiddenRes.success) return false;
	if (forbiddenRes.ok) return false;

	// Check unique elements
	const exceedsRes = doesBlockElementExceeds(safeParams.parentBlockDefinition, safeParams.parentBlockInstance, childBlockTag, blockStore.allBlocks);
	if (!exceedsRes.success) return false;
	if (exceedsRes.ok) return false;

	// Check ordered elements
	const violatesRes = doesBlockElementViolatesOrder(safeParams.parentBlockDefinition, safeParams.parentBlockInstance, childBlockTag, blockStore.allBlocks, safeParams.parentBlockInstance.contentIDs.length);
	if (!violatesRes.success) return false;
	if (violatesRes.ok) return false;

	return true;
}

/**
 * Checks if a block type can have children based on its allowedChildren property.
 * @param blockID - The block ID to check
 * @returns True if the block type can have children, false otherwise
 * @example
 * const canHaveChildren = canBlockHaveChildren('block-123'); → true
 */
export function canBlockHaveChildren(blockID: BlockID): boolean {
	const blockStore = useBlockStore.getState();
	const safeParams = new ResultPipeline('[BlockQueries → canBlockHaveChildren]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockInstance.type, getRegisteredBlocks()),
		}))
		.execute();
	if (!safeParams) return false;

	// If allowedChildren is undefined or null, the block can have any content
	if (safeParams.blockDefinition.allowedChildren == null) return true;

	return safeParams.blockDefinition.allowedChildren.length > 0;
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
	const safeParams = new ResultPipeline('[BlockQueries → canBlockHaveStyles]')
		.validate({ blockID: validateBlockID(blockID) })
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockInstance.type, getRegisteredBlocks()),
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
	const safeParams = new ResultPipeline('[BlockQueries → canBlockHaveStyle]')
		.validate({
			blockID: validateBlockID(blockID),
			styleKey: validateStyleKey(styleKey),
		})
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockInstance.type, getRegisteredBlocks()),
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
	const safeParams = new ResultPipeline('[BlockQueries → canBlockHaveAttributes]')
		.validate({ blockID: validateBlockID(blockID) })
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockInstance.type, getRegisteredBlocks()),
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
	const safeParams = new ResultPipeline('[BlockQueries → canBlockHaveAttribute]')
		.validate({
			blockID: validateBlockID(blockID),
			attributeKey: validateAttributeKey(attributeKey),
		})
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockInstance.type, getRegisteredBlocks()),
		}))
		.execute();
	if (!safeParams) return false;

	// If allowedAttributes is undefined or null, the block can have any attributes
	if (safeParams.blockDefinition.allowedAttributes == null) return true;

	return safeParams.blockDefinition.allowedAttributes.includes(safeParams.attributeKey);
}

/**
 * Gets all registered block definitions from the registry.
 * @returns BlockDefinitionRecord of all registered block definitions keyed by type
 * @example
 * const blocks = getBlockDefinitions(); → { 'text': BlockDefinition, 'container': BlockDefinition }
 */
export function getBlockDefinitions(): BlockDefinitionRecord | undefined {
	return getRegisteredBlocks();
}

/**
 * Gets a specific registered block definition by type.
 * @param blockType - The block type to retrieve
 * @returns The block definition or undefined if not found
 * @example
 * const blockDef = getBlockDefinition('text'); → BlockDefinition | undefined
 */
export function getBlockDefinition(blockType: BlockType): BlockDefinition | undefined {
	const safeParams = new ResultPipeline('[BlockQueries → getBlockDefinition]')
		.validate({
			blockType: validateBlockType(blockType),
		})
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockType, getRegisteredBlocks()),
		}))
		.execute();
	if (!safeParams) return;

	return safeParams.blockDefinition;
}

/**
 * Get a block type's icon from the registry.
 * @param blockType - The block type to get the icon for
 * @returns The block's icon component or null if not found or type is undefined
 * @example
 * const icon = getBlockIcon('text'); → <TextIcon />
 */
export function getBlockIcon(blockType: BlockType): ReactNode | undefined {
	const safeParams = new ResultPipeline('[BlockQueries → getBlockIcon]')
		.validate({
			blockType: validateBlockType(blockType),
		})
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockType, getRegisteredBlocks()),
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
	const safeParams = new ResultPipeline('[BlockQueries → getBlockRender]')
		.validate({
			blockType: validateBlockType(blockType),
		})
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockType, getRegisteredBlocks()),
		}))
		.execute();
	if (!safeParams) return;

	return safeParams.blockDefinition.render;
}

/**
 * Gets the available HTML element availableTags for a specific block type.
 * @param blockType - The block type to get availableTags for
 * @returns Array of available HTML element availableTags for the block type, or undefined if block type not found
 * @example
 * const availableTags = getBlockAvailableTags('container'); → ['div', 'section', 'article', 'aside', 'nav']
 */
export function getBlockAvailableTags(blockType: BlockType): ElementTag[] | undefined {
	const safeParams = new ResultPipeline('[BlockQueries → getBlockAvailableTags]')
		.validate({
			blockType: validateBlockType(blockType),
		})
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockType, getRegisteredBlocks()),
		}))
		.execute();
	if (!safeParams) return;

	return safeParams.blockDefinition.availableTags;
}

/**
 * Gets the allowed styles for a specific block type.
 * @param blockType - The block type to get allowed styles for
 * @returns Array of allowed styles for the block type, or undefined if block type not found
 * @example
 * const styles = getBlockAllowedStyles('text'); → ['color', 'font-size', 'margin']
 */
export function getBlockAllowedStyles(blockType: BlockType): BlockAllowedStyles | undefined {
	const safeParams = new ResultPipeline('[BlockQueries → getBlockAllowedStyles]')
		.validate({
			blockType: validateBlockType(blockType),
		})
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockType, getRegisteredBlocks()),
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
	const safeParams = new ResultPipeline('[BlockQueries → getBlockAllowedAttributes]')
		.validate({
			blockType: validateBlockType(blockType),
		})
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockType, getRegisteredBlocks()),
		}))
		.execute();
	if (!safeParams) return;

	return safeParams.blockDefinition.allowedAttributes;
}
