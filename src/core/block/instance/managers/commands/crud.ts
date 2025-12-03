// Stores
import { useBlockStore } from '@/src/state/block/block';

// Helpers
import { validateBlockType, validateBlockID } from '@/src/core/block/instance/helpers';
import { pickBlockDefinition, pickBlockInstance } from '@/src/core/block/instance/helpers/pickers';
import { createBlock, detachBlockFromParent } from '@/src/core/block/instance/helpers/operations';
import { duplicateBlockInTree, addBlockToTree, deleteBlockFromTree } from '@/src/core/block/instance/helpers/operations/tree';

// Types
import type { BlockType, BlockID } from '@/src/core/block/instance/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Managers
import { getBlockDefinitions } from '@/src/core/block/instance/managers';

/**
 * Adds a new block of the specified type to the page in block CRUD operations.
 * Creates and inserts a block instance under the specified parent.
 *
 * @param blockType - The block type to create
 * @param parentID - The parent block ID to add the new block under
 */
export function addBlock(blockType: BlockType, parentID: BlockID): void {
	const blockStore = useBlockStore.getState();

	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockManager → addBlock]')
		.validate({
			blockType: validateBlockType(blockType),
			parentID: validateBlockID(parentID),
		})
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockType, getBlockDefinitions()),
		}))
		.operate((data) => ({
			addedBlocks: addBlockToTree(createBlock(data.blockDefinition, data.parentID), blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// Add block to store
	blockStore.updateBlocks(results.addedBlocks);
}

/**
 * Deletes a block and all its descendants from the page in block CRUD operations.
 * Removes the block and its children from the store.
 *
 * @param blockID - The block identifier to delete
 */
export function deleteBlock(blockID: BlockID): void {
	if (blockID === 'body') return devLog.error(`[BlockManager → deleteBlock] Cannot delete root body block`), undefined;
	const blockStore = useBlockStore.getState();

	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockManager → deleteBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			parentInstance: pickBlockInstance(data.blockInstance.parentID, blockStore.allBlocks),
		}))
		.operate((data) => ({
			deletedBlocks: detachBlockFromParent(data.blockInstance, data.parentInstance, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// Apply the deletion to the store
	blockStore.updateBlocks(results.deletedBlocks);

	// Queue deletion with timeout for React unmounting
	setTimeout(() => {
		const currentStore = useBlockStore.getState();

		// Re-validate and pick necessary data
		const currentResults = new ResultPipeline('[BlockManager → deleteBlock → Timeout] ')
			.pick(() => ({
				blockInstance: pickBlockInstance(blockID, currentStore.allBlocks),
			}))
			.operate((data) => ({
				blocksAfterDeletion: deleteBlockFromTree(data.blockInstance, currentStore.allBlocks),
			}))
			.execute();
		if (!currentResults) return;

		// Calculate final selected ID
		const finalSelectedID = currentStore.selectedBlockID === blockID ? null : currentStore.selectedBlockID;

		// Update store with final state
		currentStore.setBlocks(currentResults.blocksAfterDeletion);
		currentStore.selectBlock(finalSelectedID);
	}, 100);
}

/**
 * Duplicates a block and all its descendants in block CRUD operations.
 * Copies the block and pastes it as a new instance.
 *
 * @param blockID - The block identifier to duplicate
 */
export function duplicateBlock(blockID: BlockID): void {
	const blockStore = useBlockStore.getState();

	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockManager → duplicateBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.operate((data) => ({
			clonedBlocks: duplicateBlockInTree(data.blockInstance, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// Apply the cloned tree returned by the helper
	blockStore.updateBlocks(results.clonedBlocks);
}
