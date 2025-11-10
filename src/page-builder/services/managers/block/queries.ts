// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

// Types
import type { BlockDefinition, BlockID, BlockType, BlockContent } from '@/src/page-builder/core/block/block/types';
import type { ElementTag } from '@/src/page-builder/core/block/element/types';
import type { StyleKey } from '@/src/page-builder/core/block/style/types';
import type { ReactNode } from 'react';

// Helpers
import { fetchBlock, fetchRegisteredBlock, fetchRegisteredBlocks, fetchBlockAttributes, fetchBlockContent, fetchSelectedBlock } from '@/src/page-builder/services/helpers/block/fetch';
import { canBlockMoveInto } from '@/src/page-builder/services/helpers/block/hierarchy';
import { renderBlockStyles, renderBlockAttributes } from '@/src/page-builder/services/helpers/block/render';
import { resolveStyle } from '@/src/page-builder/services/helpers/block/style';
import { validateStyleKey, validateBlockTag, validateBlockType, validateBlockID } from '@/src/page-builder/services/helpers/block/validate';

// Managers
import { getSelectedDeviceID, getSelectedOrientationID, getSelectedPseudoID } from '@/src/page-builder/services/managers/page';
import { validateDeviceID, validateOrientationID, validatePseudoID } from '../../helpers';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';

/**
 * Gets the currently selected block ID from the store.
 * @returns The selected block ID or null
 * @example
 * const selectedID = getSelectedBlockID(); // 'block-123' | null
 */
export function getSelectedBlockID(): BlockID | null {
	const blockStore = useBlockStore.getState();
	const safeParams = new ValidationPipeline('[BlockQueries → getSelectedBlockID]')
		.fetch(() => ({
			selectedBlockID: fetchSelectedBlock(blockStore.selectedBlockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeParams) return null;

	return safeParams.selectedBlockID;
}

// ------------------------- STYLE -------------------------

/**
 * Gets a style key value with CSS cascade fallback logic for block style operations.
 * Resolves the style value considering device, orientation, and pseudo contexts.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS style key to lookup
 * @returns The resolved value or undefined if not found
 *
 * @example
 * getBlockStyle('block-123', 'color') → 'red'
 */
export function getBlockStyle(blockID: BlockID, styleKey: StyleKey): string | undefined {
	const blockStore = useBlockStore.getState();
	const safeParams = new ValidationPipeline('[BlockQueries → getBlockStyle]')
		.validate({
			blockID: validateBlockID(blockID),
			styleKey: validateStyleKey(styleKey),
			deviceID: validateDeviceID(getSelectedDeviceID()),
			orientationID: validateOrientationID(getSelectedOrientationID()),
			pseudoID: validatePseudoID(getSelectedPseudoID()),
		})
		.fetch((data) => ({
			block: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeParams) return undefined;

	return resolveStyle(
		safeParams.block.styles, //
		safeParams.styleKey,
		safeParams.deviceID,
		safeParams.orientationID,
		safeParams.pseudoID
	);
}

/**
 * Reactive hook to get rendered CSS styles for a block in block rendering operations.
 * Combines block styles with current device, orientation, and pseudo states to generate CSS.
 *
 * @param blockID - The block identifier
 * @returns Rendered CSS string or undefined if block doesn't exist or has no styles
 *
 * @example
 * getBlockRenderedStyles('block-123') → 'color: red; font-size: 16px;'
 */
export function getBlockRenderedStyles(blockID: BlockID): string | undefined {
	const blockStore = useBlockStore.getState();
	const safeParams = new ValidationPipeline('[BlockQueries → getBlockRenderedStyles]')
		.validate({
			blockID: validateBlockID(blockID),
			deviceID: validateDeviceID(getSelectedDeviceID()),
			orientationID: validateOrientationID(getSelectedOrientationID()),
			pseudoID: validatePseudoID(getSelectedPseudoID()),
		})
		.fetch((data) => ({
			block: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeParams) return undefined;

	return renderBlockStyles(
		safeParams.block.styles, //
		blockID,
		safeParams.deviceID,
		safeParams.orientationID,
		safeParams.pseudoID
	);
}

// ------------------------- ATTRIBUTE -------------------------

/**
 * Reactive hook to get rendered HTML attributes for a block in block rendering operations.
 * Processes block attributes for HTML rendering with any necessary transformations.
 *
 * @param blockID - The block identifier
 * @returns Rendered attributes object or undefined if block doesn't exist or has no attributes
 *
 * @example
 * getBlockRenderedAttributes('block-123') → { class: 'my-class', id: 'block-123' }
 */
export function getBlockRenderedAttributes(blockID: BlockID): Record<string, string | boolean> | undefined {
	const blockStore = useBlockStore.getState();
	const safeParams = new ValidationPipeline('[BlockQueries → getBlockRenderedAttributes]')
		.validate({ blockID: validateBlockID(blockID) })
		.fetch((data) => ({
			attributes: fetchBlockAttributes(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeParams) return undefined;

	return renderBlockAttributes(safeParams.attributes);
}

// ------------------------- CONTENT -------------------------

/**
 * Gets the content data for a specific block.
 * Returns the block's content object or undefined if not found.
 *
 * @param blockID - The block identifier
 * @returns The block's content data or undefined
 *
 * @example
 * const content = getBlockContent('block-123') // Returns { text: 'Hello World' }
 */
export function getBlockContent(blockID: BlockID): BlockContent | undefined {
	const blockStore = useBlockStore.getState();
	const safeParams = new ValidationPipeline('[BlockQueries → getBlockContent]')
		.validate({ blockID: validateBlockID(blockID) })
		.fetch((data) => ({
			content: fetchBlockContent(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeParams) return undefined;

	return safeParams.content;
}

// ------------------------- REGISTRY -------------------------

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
 * Checks if a block type can have children based on its permittedContent property.
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

	// If permittedContent is undefined or null, the block can have any content
	if (safeParams.blockDefinition.permittedContent == null) return true;

	return safeParams.blockDefinition.permittedContent.length > 0;
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
