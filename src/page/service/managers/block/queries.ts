// Stores
import { useBlockStore } from '@/src/page/state/stores/block';

// Types
import type { BlockDefinition, BlockID, BlockType, BlockContent, BlockAllowedStyles, BlockAllowedAttributes } from '@/src/page/core/block/block/types';
import type { ElementTag } from '@/src/page/core/block/element/types';
import type { StyleKey } from '@/src/page/core/block/style/types';
import type { AttributeKey } from '@/src/page/core/block/attribute/types';
import type { ReactNode } from 'react';

// Helpers
import { fetchBlock, fetchRegisteredBlock, fetchRegisteredBlocks, fetchBlockAttributes, fetchBlockContent, fetchSelectedBlock } from '@/src/page/service/helpers/block/fetch';
import { canBlockMoveInto } from '@/src/page/service/helpers/block/hierarchy';
import { renderBlockStyles, renderBlockAttributes } from '@/src/page/service/helpers/block/render';
import { resolveStyle } from '@/src/page/service/helpers/block/style';
import { validateAttributeKey, validateStyleKey, validateBlockTag, validateBlockType, validateBlockID } from '@/src/page/service/helpers/block/validate';

// Managers
import { getSelectedDeviceID, getSelectedOrientationID, getSelectedPseudoID } from '@/src/page/service/managers/page';
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
