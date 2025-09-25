// Stores
import useBlockStore from '@/src/page-builder/state/stores/block';

// Helpers
import { createBlockInstance } from '@/src/page-builder/services/helpers/block/block';

// Types
import type { BlockInstance, BlockTypes, BlockID } from '@/src/page-builder/core/block/block/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';

/**
 * Adds a new block of the specified type to the page.
 * @param type - The block type to create
 * @param parentID - Optional parent block ID to add the new block under
 * @example
 * addBlock('text', 'parent-123'); // Creates and adds a text block
 */
export function addBlock(type: BlockTypes, parentID?: BlockID) {
	if(!parentID) parentID = 'body';

	const store = useBlockStore.getState();
	const createdBlock = createBlockInstance(type, parentID);
	if (!createdBlock.success) return devLog.error(`[BlockManager → addBlock] ${createdBlock.error}`);

	const newBlock = createdBlock.data;
	store.addBlock(newBlock);
}

/**
 * Deletes a block and all its descendants from the page.
 * @param blockID - The block identifier to delete
 * @example
 * deleteBlock('block-123'); // Deletes block and all children
 */
export function deleteBlock(blockID: BlockID) {
	if (blockID === 'body') return devLog.error(`[BlockManager → deleteBlock] Cannot delete root body block`);
	const store = useBlockStore.getState();
	store.deleteBlock(blockID);
}

/**
 * Selects a block as the currently active block for editing.
 * @param blockID - The block identifier to select, or null to clear selection
 * @example
 * selectBlock('block-123'); // Selects the block
 * selectBlock(null); // Clears selection
 */
export function selectBlock(blockID: BlockID | null) {
	const store = useBlockStore.getState();
	const selectedBlockID = store.selectedBlockID;

	if (blockID === selectedBlockID) return;
	if (blockID === null) return store.selectBlock('body');

	const blockExists = store.allBlocks[blockID];
	if (!blockExists) return;

	store.selectBlock(blockID);
}

/**
 * Reactive hook to get a complete block instance.
 * @param blockID - The block identifier to retrieve
 * @returns The complete block instance or undefined if block doesn't exist
 * @example
 * const block = useBlock('block-123'); // { id: 'block-123', type: 'text', ... }
 */
export function useBlock(blockID: BlockID): BlockInstance | undefined {
	return useBlockStore((state) => state.allBlocks[blockID]);
}
