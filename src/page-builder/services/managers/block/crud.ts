// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

// Helpers
import { validateBlockType, validateBlockID } from '@/src/page-builder/services/helpers/block';

// Types
import type { BlockInstance, BlockType, BlockID, BlockAttributes, BlockStyles } from '@/src/page-builder/core/block/block/types';

// Utilities
import { createBlock, deleteBlockFromParent, processBlockDeletions, addBlockToParent, cloneBlock } from '@/src/page-builder/core/block/block/utilities/crud';
import { moveBlockAfter as moveBlockAfterUtil, moveBlockBefore as moveBlockBeforeUtil } from '@/src/page-builder/core/block/block/utilities/hierarchy';

import { devLog } from '@/src/shared/utilities/dev';
import { validateOrLog } from '@/src/shared/utilities/validation';

// Registry
import { getRegisteredBlock } from '@/src/page-builder/state/registries/block';

// Clipboard storage for copy/paste operations
let blockClipboard: BlockInstance | null = null;
let stylesClipboard: BlockStyles | null = null;
let attributesClipboard: BlockAttributes | null = null;

/**
 * Adds a new block of the specified type to the page in block CRUD operations.
 * Creates and inserts a block instance under the specified parent.
 *
 * @param blockType - The block type to create
 * @param parentID - The parent block ID to add the new block under
 * @returns void
 *
 * @example
 * addBlock('text', 'parent-123')
 */
export function addBlock(blockType: BlockType, parentID: BlockID): void {
	const safeParams = validateOrLog({ blockType: validateBlockType(blockType), parentID: validateBlockID(parentID) }, `[BlockManager → addBlock]`);
	if (!safeParams) return;

	const store = useBlockStore.getState();

	// Get block definition and validate registration
	const definition = getRegisteredBlock(safeParams.blockType);
	if (!definition) return devLog.error(`[BlockManager → addBlock] Block type "${safeParams.blockType}" is not registered`, undefined);

	// Create the block instance
	const newBlock = createBlock(definition, safeParams.parentID, {}, {});

	// Add block to store
	store.updateBlocks({ [newBlock.id]: newBlock });

	// Update parent relationship
	const updatedBlocks = addBlockToParent(newBlock, store.allBlocks);
	if (updatedBlocks !== store.allBlocks) {
		store.updateBlocks(updatedBlocks);
	}
}

/**
 * Deletes a block and all its descendants from the page in block CRUD operations.
 * Removes the block and its children from the store.
 *
 * @param blockID - The block identifier to delete
 * @returns void
 *
 * @example
 * deleteBlock('block-123')
 */
export function deleteBlock(blockID: BlockID): void {
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → deleteBlock]`);
	if (!safeParams) return;

	if (safeParams.blockID === 'body') return devLog.error(`[BlockManager → deleteBlock] Cannot delete root body block`, undefined);

	const store = useBlockStore.getState();

	// Remove block from parent relationship
	const updatedBlocks = deleteBlockFromParent(safeParams.blockID, store.allBlocks);
	store.updateBlocks(updatedBlocks);

	// Queue deletion with timeout for React unmounting
	setTimeout(() => {
		const currentStore = useBlockStore.getState();
		const { allBlocks: finalBlocks, selectedBlockID: finalSelectedID } = processBlockDeletions([safeParams.blockID], currentStore.allBlocks, currentStore.selectedBlockID);

		// Update store with final state
		useBlockStore.setState({
			allBlocks: finalBlocks,
			selectedBlockID: finalSelectedID,
		});
	}, 100);
}

/**
 * Copies a block and all its descendants to the clipboard in block CRUD operations.
 * Stores the block data for later pasting.
 *
 * @param blockID - The block identifier to copy
 * @returns void
 *
 * @example
 * copyBlock('block-123')
 */
export function copyBlock(blockID: BlockID): void {
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → copyBlock]`);
	if (!safeParams) return;

	const store = useBlockStore.getState();
	const block = store.getBlock(safeParams.blockID);
	if (!block) return devLog.error(`[BlockManager → copyBlock] Block ${safeParams.blockID} not found`, undefined);

	blockClipboard = JSON.parse(JSON.stringify(block));
}

/**
 * Pastes a copied block as a sibling after the specified block in block CRUD operations.
 * Creates a new block instance from clipboard data.
 *
 * @param blockID - The block identifier to paste after
 * @returns void
 *
 * @example
 * pasteBlock('block-123')
 */
export function pasteBlock(blockID: BlockID): void {
	if (!blockClipboard) return devLog.error(`[BlockManager → pasteBlock] No block in clipboard`, undefined);

	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → pasteBlock]`);
	if (!safeParams) return;

	const store = useBlockStore.getState();
	const targetBlock = store.getBlock(safeParams.blockID);
	if (!targetBlock) return devLog.error(`[BlockManager → pasteBlock] Target block ${safeParams.blockID} not found`, undefined);

	// Duplicate the entire block tree from clipboard
	const { clonedBlocks } = cloneBlock(blockClipboard, store.allBlocks, targetBlock.id);

	// Add all positioned blocks to store in one update
	store.updateBlocks(clonedBlocks);
}

/**
 * Duplicates a block and all its descendants in block CRUD operations.
 * Copies the block and pastes it as a new instance.
 *
 * @param blockID - The block identifier to duplicate
 * @returns void
 *
 * @example
 * duplicateBlock('block-123')
 */
export function duplicateBlock(blockID: BlockID): void {
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → duplicateBlock]`);
	if (!safeParams) return;

	const store = useBlockStore.getState();
	const targetBlock = store.getBlock(safeParams.blockID);
	if (!targetBlock) return devLog.error(`[BlockManager → pasteBlock] Target block ${safeParams.blockID} not found`, undefined);

	// Duplicate the entire block tree from clipboard
	const { clonedBlocks, rootBlock } = cloneBlock(targetBlock, store.allBlocks);

	// Position the new root block after the target block
	const positionedBlocks = moveBlockAfterUtil(rootBlock.id, safeParams.blockID, { ...store.allBlocks, ...clonedBlocks });
	store.updateBlocks(positionedBlocks);
}

/**
 * Copies the styles of a block to the clipboard in block CRUD operations.
 * Stores the block styles for later pasting.
 *
 * @param blockID - The block identifier to copy styles from
 * @returns void
 *
 * @example
 * copyBlockStyles('block-123')
 */
export function copyBlockStyles(blockID: BlockID): void {
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → copyBlockStyles]`);
	if (!safeParams) return;

	const store = useBlockStore.getState();
	const block = store.getBlock(safeParams.blockID);
	if (!block) return devLog.error(`[BlockManager → copyBlockStyles] Block ${safeParams.blockID} not found`, undefined);

	stylesClipboard = JSON.parse(JSON.stringify(block.styles));
}

/**
 * Pastes copied styles to a target block in block CRUD operations.
 * Applies the styles from clipboard to the specified block.
 *
 * @param blockID - The block identifier to paste styles to
 * @returns void
 *
 * @example
 * pasteBlockStyles('block-123')
 */
export function pasteBlockStyles(blockID: BlockID): void {
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → pasteBlockStyles]`);
	if (!safeParams) return;

	if (!stylesClipboard) return devLog.error(`[BlockManager → pasteBlockStyles] No styles in clipboard`, undefined);

	const store = useBlockStore.getState();
	const targetBlock = store.getBlock(safeParams.blockID);
	if (!targetBlock) return devLog.error(`[BlockManager → pasteBlockStyles] Target block ${safeParams.blockID} not found`, undefined);

	targetBlock.styles = JSON.parse(JSON.stringify(stylesClipboard));
	store.updateBlock(safeParams.blockID, targetBlock);
}

/**
 * Copies the attributes of a block to the clipboard in block CRUD operations.
 * Stores the block attributes for later pasting.
 *
 * @param blockID - The block identifier to copy attributes from
 * @returns void
 *
 * @example
 * copyBlockAttributes('block-123')
 */
export function copyBlockAttributes(blockID: BlockID): void {
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → copyBlockAttributes]`);
	if (!safeParams) return;

	const store = useBlockStore.getState();
	const block = store.getBlock(safeParams.blockID);
	if (!block) return devLog.error(`[BlockManager → copyBlockAttributes] Block ${safeParams.blockID} not found`, undefined);

	attributesClipboard = JSON.parse(JSON.stringify(block.attributes));
}

/**
 * Pastes copied attributes to a target block in block CRUD operations.
 * Applies the attributes from clipboard to the specified block.
 *
 * @param blockID - The block identifier to paste attributes to
 * @returns void
 *
 * @example
 * pasteBlockAttributes('block-123')
 */
export function pasteBlockAttributes(blockID: BlockID): void {
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → pasteBlockAttributes]`);
	if (!safeParams) return;

	if (!attributesClipboard) return devLog.error(`[BlockManager → pasteBlockAttributes] No attributes in clipboard`, undefined);

	const store = useBlockStore.getState();
	const targetBlock = store.getBlock(safeParams.blockID);
	if (!targetBlock) return devLog.error(`[BlockManager → pasteBlockAttributes] Target block ${safeParams.blockID} not found`, undefined);

	targetBlock.attributes = JSON.parse(JSON.stringify(attributesClipboard));
	store.updateBlock(safeParams.blockID, targetBlock);
}
