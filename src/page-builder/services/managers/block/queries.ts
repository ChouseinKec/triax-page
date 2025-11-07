import { useMemo } from 'react';

// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

// Registry
import * as BlockRegistry from '@/src/page-builder/state/registries/block';

// Types
import type { BlockDefinition, BlockID, BlockInstance, BlockType, BlockContent } from '@/src/page-builder/core/block/block/types';
import type { ElementTag } from '@/src/page-builder/core/block/element/types';
import type { StyleKey } from '@/src/page-builder/core/block/style/types';
import type { AttributeKey } from '@/src/page-builder/core/block/attribute/types';
import type { ReactNode } from 'react';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';
import { devLog } from '@/src/shared/utilities/dev';

// Helpers
import { validateStyleKey, validateAttributeKey, validateBlockTag, validateBlockType, validateBlockID, validateDeviceID, validateOrientationID, validatePseudoID } from '@/src/page-builder/services/helpers/validate';
import { canBlockMoveInto, renderBlockStyles, renderBlockAttributes, resolveStyle } from '@/src/page-builder/services/helpers/block';
import { fetchBlock } from '@/src/page-builder/services/helpers/fetch';

// Managers
import { useSelectedDeviceID, useSelectedOrientationID, useSelectedPseudoID } from '@/src/page-builder/services/managers/page';

// ------------------------- INSTANCE -------------------------

/**
 * Reactive hook to get a block's type for block queries.
 * Returns the block type and updates reactively when it changes.
 *
 * @param blockID - The block identifier
 * @returns The block type or undefined if block doesn't exist
 *
 * @example
 * useBlockType('block-123') → 'text'
 */
export function useBlockType(blockID: BlockID): BlockType | undefined {
	const safeData = new ValidationPipeline('[BlockQueries → useBlockType]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.execute();

	return useBlockStore((state) => (safeData ? state.allBlocks[safeData.blockID]?.type : undefined));
}

/**
 * Reactive hook to get a block's HTML tag for block queries.
 * Returns the block's primary HTML tag and updates reactively when it changes.
 *
 * @param blockID - The block identifier
 * @returns The block's HTML tag or undefined if block doesn't exist
 *
 * @example
 * useBlockTag('block-123') → 'div'
 * useBlockTag('body') → 'body'
 */
export function useBlockTag(blockID: BlockID): ElementTag | undefined {
	const safeData = new ValidationPipeline('[BlockQueries → useBlockTag]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.execute();

	return useBlockStore((state) => (safeData ? state.allBlocks[safeData.blockID]?.tag : undefined));
}

/**
 * Reactive hook to get a block's ID for block queries.
 * Returns the validated block ID and updates reactively.
 *
 * @param blockID - The block identifier to validate
 * @returns The validated block ID or undefined if block doesn't exist
 *
 * @example
 * useBlockID('block-123') → 'block-123'
 */
export function useBlockID(blockID: BlockID): BlockID | undefined {
	const safeData = new ValidationPipeline('[BlockQueries → useBlockID]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.execute();

	return useBlockStore((state) => (safeData ? state.allBlocks[safeData.blockID]?.id : undefined));
}

/**
 * Reactive hook to get a block's content block IDs for block queries.
 * Returns the array of child block IDs and updates reactively.
 *
 * @param blockID - The block identifier
 * @returns Array of child block IDs or undefined if block doesn't exist
 *
 * @example
 * useBlockContentIDs('block-123') → ['block-456', 'block-789']
 */
export function useBlockContentIDs(blockID: BlockID): BlockID[] | undefined {
	const safeData = new ValidationPipeline('[BlockQueries → useBlockContentIDs]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.execute();

	return useBlockStore((state) => (safeData ? state.allBlocks[safeData.blockID]?.contentIDs : []));
}

/**
 * Reactive hook to get a complete block instance in block queries.
 * Returns the block data and updates reactively when it changes.
 *
 * @param blockID - The block identifier to retrieve
 * @returns The complete block instance or undefined if not found
 *
 * @example
 * useBlock('block-123') → { id: 'block-123', type: 'text', ... }
 */
export function useBlock(blockID: BlockID): BlockInstance | undefined {
	const safeData = new ValidationPipeline('[BlockQueries → useBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.execute();

	return useBlockStore((state) => (safeData ? state.allBlocks[safeData.blockID] : undefined));
}

// ------------------------- SELECTION -------------------------

/**
 * Reactive hook to check if a specific block is currently selected.
 * @param blockID - The block identifier to check
 * @returns True if the block is selected, false otherwise
 * @example
 * const isSelected = useIsBlockSelected('block-123'); // true/false
 */
export function useIsBlockSelected(blockID: BlockID): boolean {
	const safeData = useMemo(
		() =>
			new ValidationPipeline('[BlockQueries → useIsBlockSelected]')
				.validate({
					blockID: validateBlockID(blockID),
				})
				.execute(),
		[blockID]
	);

	return useBlockStore((state) => {
		if (!safeData) return false;
		return state.selectedBlockID === safeData.blockID;
	});
}

/**
 * Reactive hook to get the type of the currently selected block.
 * @returns The selected block type or undefined if no block is selected
 * @example
 * const selectedType = useSelectedBlockType(); // 'text' | undefined
 */
export function useSelectedBlockType(): BlockType | undefined {
	return useBlockStore((state) => {
		const id = state.selectedBlockID;
		if (!id) return undefined;
		return state.getBlock(id)?.type;
	});
}

/**
 * Reactive hook to get the ID of the currently selected block.
 * @returns The selected block ID or undefined if no block is selected
 * @example
 * const selectedID = useSelectedBlockID(); // 'block-123' | undefined
 */
export function useSelectedBlockID(): BlockID | null {
	return useBlockStore((state) => state.selectedBlockID);
}

/**
 * Gets the currently selected block ID from the store.
 * @returns The selected block ID or null
 * @example
 * const selectedID = getSelectedBlockID(); // 'block-123' | null
 */
export function getSelectedBlockID(): BlockID | null {
	return useBlockStore.getState().selectedBlockID;
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
	const safeData = new ValidationPipeline('[BlockManager → getBlockStyle]')
		.validate({
			blockID: validateBlockID(blockID),
			styleKey: validateStyleKey(styleKey),
			deviceID: validateDeviceID(useSelectedDeviceID()),
			orientationID: validateOrientationID(useSelectedOrientationID()),
			pseudoID: validatePseudoID(useSelectedPseudoID()),
		})
		.fetch((data) => ({
			block: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return undefined;

	return resolveStyle(
		safeData.block.styles, //
		safeData.styleKey,
		safeData.deviceID,
		safeData.orientationID,
		safeData.pseudoID
	);
}

/**
 * Reactive hook to get a block's style value with CSS cascade fallback logic for block style operations.
 * Returns the resolved style value considering device, orientation, and pseudo contexts.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS style key to retrieve
 * @returns The resolved style value or undefined if not found
 *
 * @example
 * const color = useBlockStyle('block-123', 'color') // Returns 'red' or undefined
 */
export function useBlockStyle(blockID: BlockID, styleKey: StyleKey): string | undefined {
	const deviceID = useSelectedDeviceID();
	const orientationID = useSelectedOrientationID();
	const pseudoID = useSelectedPseudoID();

	const safeData = useMemo(
		() =>
			new ValidationPipeline('[BlockManager → getBlockStyle]')
				.validate({
					blockID: validateBlockID(blockID),
					styleKey: validateStyleKey(styleKey),
					deviceID: validateDeviceID(deviceID),
					orientationID: validateOrientationID(orientationID),
					pseudoID: validatePseudoID(pseudoID),
				})
				.fetch((data) => ({
					block: fetchBlock(data.blockID, useBlockStore.getState().allBlocks),
				}))
				.execute(),
		[blockID, styleKey, deviceID, orientationID, pseudoID]
	);

	return useBlockStore(
		useMemo(
			() => (state) => {
				if (!safeData) return undefined;
				const styles = state.allBlocks[blockID]?.styles;
				if (!styles) return undefined;

				return resolveStyle(
					styles, //
					styleKey,
					safeData.deviceID,
					safeData.orientationID,
					safeData.pseudoID
				);
			},
			[blockID, styleKey, safeData]
		)
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
 * useRenderedBlockStyles('block-123') → 'color: red; font-size: 16px;'
 */
export function useRenderedBlockStyles(blockID: BlockID): string | undefined {
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockQueries → getRegisteredBlock]')
		.validate({
			blockID: validateBlockID(blockID),
			selectedDeviceID: validateDeviceID(useSelectedDeviceID()),
			selectedOrientationID: validateOrientationID(useSelectedOrientationID()),
			selectedPseudoID: validatePseudoID(useSelectedPseudoID()),
		})
		.fetch((data) => ({
			block: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	return renderBlockStyles(
		safeData.block.styles, //
		blockID,
		safeData.selectedDeviceID,
		safeData.selectedOrientationID,
		safeData.selectedPseudoID
	);
}

// ------------------------- ATTRIBUTE -------------------------

/**
 * Subscribes to attribute value changes for a specific block in block attribute operations.
 * Returns the current attribute value and updates reactively when it changes.
 *
 * @param blockID - The block identifier to subscribe to
 * @param attributeKey - The attribute key to watch for changes
 * @returns The current attribute value or undefined if not found
 *
 * @example
 * useBlockAttribute('block-1', 'className')
 */
export function useBlockAttribute(blockID: BlockID, attributeKey: AttributeKey): string | undefined {
	const safeData = useMemo(
		() =>
			new ValidationPipeline('[BlockManager → useBlockAttribute]')
				.validate({
					blockID: validateBlockID(blockID),
					attributeKey: validateAttributeKey(attributeKey),
				})
				.execute(),
		[blockID, attributeKey]
	);

	return useBlockStore((state) => {
		if (!safeData) return undefined;
		return state.allBlocks[safeData.blockID]?.attributes?.[safeData.attributeKey];
	});
}

/**
 * Reactive hook to get rendered HTML attributes for a block in block rendering operations.
 * Processes block attributes for HTML rendering with any necessary transformations.
 *
 * @param blockID - The block identifier
 * @returns Rendered attributes object or undefined if block doesn't exist or has no attributes
 *
 * @example
 * useRenderedBlockAttributes('block-123') → { class: 'my-class', id: 'block-123' }
 */
export function useRenderedBlockAttributes(blockID: BlockID): Record<string, string | boolean> | undefined {
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockQueries → getRegisteredBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.fetch((data) => ({
			block: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	return renderBlockAttributes(safeData.block.attributes);
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
	const safeData = new ValidationPipeline('[BlockQueries → getBlockContent]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.execute();
	if (!safeData) return undefined;

	const block = useBlockStore.getState().allBlocks[safeData.blockID];
	return block?.content;
}

/**
 * React hook to get the content data for a specific block.
 * Returns the block's content object or undefined if not found.
 *
 * @param blockID - The block identifier
 * @returns The block's content data or undefined
 *
 * @example
 * const content = useBlockContent('block-123') // Returns { text: 'Hello World' }
 */
export function useBlockContent(blockID: BlockID): BlockContent | undefined {
	const safeData = useMemo(
		() =>
			new ValidationPipeline('[BlockQueries → useBlockContent]')
				.validate({
					blockID: validateBlockID(blockID),
				})
				.execute(),
		[blockID]
	);

	if (!safeData) return undefined;

	return useBlockStore((state) => state.allBlocks[safeData.blockID]?.content);
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
	const safeData = new ValidationPipeline('[BlockQueries → canBlockAcceptChild]')
		.validate({
			parentTag: validateBlockTag(parentTag),
			childTag: validateBlockTag(childTag),
		})
		.execute();
	if (!safeData) return false;

	return canBlockMoveInto(safeData.parentTag, safeData.childTag);
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
	const safeData = new ValidationPipeline('[BlockQueries → canBlockHaveChildren]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.fetch((data) => ({
			blockInstance: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return false;

	const registeredBlocks = BlockRegistry.getRegisteredBlocks();
	const blockDefinition = registeredBlocks[safeData.blockInstance.type];

	if (!blockDefinition) return devLog.error(`[BlockQueries → canBlockHaveChildren] Block definition not found`), false;

	if (blockDefinition.permittedContent == null) return true;
	return blockDefinition.permittedContent.length > 0;
}

/**
 * Gets all registered block definitions from the registry.
 * @returns Record of all registered block definitions keyed by type
 * @example
 * const blocks = getRegisteredBlocks(); // { 'text': BlockDefinition, 'container': BlockDefinition }
 */
export function getRegisteredBlocks(): Record<string, BlockDefinition> {
	return BlockRegistry.getRegisteredBlocks();
}

/**
 * Gets a specific registered block definition by type.
 * @param blockType - The block type to retrieve
 * @returns The block definition or undefined if not found
 * @example
 * const blockDef = getRegisteredBlock('text'); // BlockDefinition | undefined
 */
export function getRegisteredBlock(blockType: BlockType): BlockDefinition | undefined {
	const safeData = new ValidationPipeline('[BlockManager → getRegisteredBlock]')
		.validate({
			blockType: validateBlockType(blockType),
		})
		.execute();
	if (!safeData) return;

	return BlockRegistry.getRegisteredBlock(safeData.blockType);
}

/**
 * Get a block type's icon from the registry.
 * @param blockType - The block type to get the icon for
 * @returns The block's icon component or null if not found or type is undefined
 * @example
 * const icon = getBlockIcon('text'); // <TextIcon />
 */
export function getBlockIcon(blockType: BlockType): ReactNode | undefined {
	const safeData = new ValidationPipeline('[BlockManager → getBlockIcon]')
		.validate({
			blockType: validateBlockType(blockType),
		})
		.execute();
	if (!safeData) return;

	return getRegisteredBlock(safeData.blockType)?.icon;
}

/**
 * Get a block type's render function from the registry.
 * @param blockType - The block type to get the render function for
 * @returns The block's render function or undefined if not found or type is undefined
 * @example
 * const render = getBlockRender('text'); // (block, children) => <TextBlock ... />
 */
export function getBlockRender(blockType: BlockType) {
	const safeData = new ValidationPipeline('[BlockManager → getBlockRender]')
		.validate({
			blockType: validateBlockType(blockType),
		})
		.execute();
	if (!safeData) return;

	return getRegisteredBlock(safeData.blockType)?.render;
}

/**
 * Gets the available HTML element tags for a specific block type.
 * @param blockType - The block type to get tags for
 * @returns Array of available HTML element tags for the block type, or undefined if block type not found
 * @example
 * const tags = getBlockTags('container'); // ['div', 'section', 'article', 'aside', 'nav']
 */
export function getBlockTags(blockType: BlockType): ElementTag[] | undefined {
	const safeData = new ValidationPipeline('[BlockManager → getBlockTags]')
		.validate({
			blockType: validateBlockType(blockType),
		})
		.execute();
	if (!safeData) return;

	const blockDefinition = getRegisteredBlock(safeData.blockType);
	return blockDefinition?.tags;
}
