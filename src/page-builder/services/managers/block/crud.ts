// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

// Helpers
import { createBlockInstance } from '@/src/page-builder/services/helpers/block/block';
import { validateBlockType, validateBlockID } from '@/src/page-builder/services/helpers/block/block';

// Types
import type { BlockInstance, BlockType, BlockID, BlockAttributes, BlockStyles } from '@/src/page-builder/core/block/block/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';
import { validateOrLog } from '@/src/shared/utilities/validation';

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
	const createdBlock = createBlockInstance(safeParams.blockType, safeParams.parentID);
	if (!createdBlock.success) return devLog.error(`[BlockManager → addBlock] ${createdBlock.error}`, undefined);

	const newBlock = createdBlock.data;
	store.addBlock(newBlock);
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
	store.deleteBlock(safeParams.blockID);
}

/**
 * Selects a block as the currently active block for editing in block CRUD operations.
 * Sets the selected block ID in the store.
 *
 * @param blockID - The block identifier to select, or null to clear selection
 * @returns void
 *
 * @example
 * selectBlock('block-123')
 * selectBlock(null)
 */
export function selectBlock(blockID: BlockID | null): void {
	const store = useBlockStore.getState();
	if (blockID === null) return store.selectBlock(null);

	const selectedBlockID = store.selectedBlockID;
	if (blockID === selectedBlockID) return;

	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → selectBlock]`);
	if (!safeParams) return;

	store.selectBlock(safeParams.blockID);
}

/**
 * Reactive hook to get a complete block instance in block CRUD operations.
 * Returns the block data and updates reactively when it changes.
 *
 * @param blockID - The block identifier to retrieve
 * @returns The complete block instance or undefined if not found
 *
 * @example
 * useBlock('block-123') → { id: 'block-123', type: 'text', ... }
 */
export function useBlock(blockID: BlockID): BlockInstance | undefined {
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → useBlock]`);
	if (!safeParams) return;

	return useBlockStore((state) => state.allBlocks[safeParams.blockID]);
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

	blockClipboard = JSON.parse(JSON.stringify(block)); // Deep copy
	devLog.info(`[BlockManager → copyBlock] Copied block ${safeParams.blockID}`);
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

	// Create new block instance with new ID
	const createdBlock = createBlockInstance(blockClipboard.type, targetBlock.parentID || 'body');
	if (!createdBlock.success) return devLog.error(`[BlockManager → pasteBlock] ${createdBlock.error}`, undefined);

	const newBlock = createdBlock.data;
	// Copy attributes and styles from clipboard
	newBlock.attributes = JSON.parse(JSON.stringify(blockClipboard.attributes));
	newBlock.styles = JSON.parse(JSON.stringify(blockClipboard.styles));

	store.addBlock(newBlock);
	devLog.info(`[BlockManager → pasteBlock] Pasted block as ${newBlock.id}`);
}

/**
 * Cuts a block by copying it to clipboard and deleting it in block CRUD operations.
 * Combines copy and delete operations.
 *
 * @param blockID - The block identifier to cut
 * @returns void
 *
 * @example
 * cutBlock('block-123')
 */
export function cutBlock(blockID: BlockID): void {
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID) }, `[BlockManager → cutBlock]`);
	if (!safeParams) return;

	copyBlock(safeParams.blockID);
	deleteBlock(safeParams.blockID);

	devLog.info(`[BlockManager → cutBlock] Cut block ${safeParams.blockID}`);
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

	copyBlock(safeParams.blockID);
	const store = useBlockStore.getState();
	const block = store.getBlock(safeParams.blockID);
	if (block) pasteBlock(safeParams.blockID);

	devLog.info(`[BlockManager → duplicateBlock] Duplicated block ${safeParams.blockID}`);
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
	devLog.info(`[BlockManager → copyBlockStyles] Copied styles from block ${safeParams.blockID}`);
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
	devLog.info(`[BlockManager → pasteBlockStyles] Pasted styles to block ${safeParams.blockID}`);
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
	devLog.info(`[BlockManager → copyBlockAttributes] Copied attributes from block ${safeParams.blockID}`);
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
	devLog.info(`[BlockManager → pasteBlockAttributes] Pasted attributes to block ${safeParams.blockID}`);
}
