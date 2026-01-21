// Stores
import { useBlockStore } from '@/state/block/block';

// Helpers
import { validateBlockID, validateBlockInstance } from '@/core/block/instance/helpers/validators';
import { pickBlockInstance } from '@/core/block/instance/helpers/pickers';
import { overwriteBlockInTree } from '@/core/block/instance/helpers/operations/tree';

// Types
import type { BlockInstance, BlockID } from '@/core/block/instance/types';

// Utilities
import { devLog } from '@/shared/utilities/dev';
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Clipboard storage for copy/paste operations
let blockClipboard: BlockInstance | null = null;

/**
 * Copies a blockInstance and all its descendants to the clipboard in blockInstance CRUD operations.
 * Stores the complete blockInstance tree for later pasting.
 *
 * @param blockID - The blockInstance identifier to copy
 */
export function copyBlock(blockID: BlockID): void {
	const blockStore = useBlockStore.getState();

	// Validate and pick the blockInstance to copy
	const results = new ResultPipeline('[BlockManager → copyBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// Store the entire blockInstance tree in clipboard
	blockClipboard = JSON.parse(JSON.stringify(results.blockInstance));
}

/**
 * Pastes a copied blockInstance by replacing the target blockInstance's content with clipboard content.
 * Maintains the target's position in the hierarchy while updating its type, styles, attributes, and content structure.
 *
 * @param blockID - The blockInstance identifier to replace with clipboard content
 */
export function pasteBlock(blockID: BlockID): void {
	if (!blockClipboard) return devLog.error(`[BlockManager → pasteBlock] No blockInstance in clipboard`), undefined;
	const blockStore = useBlockStore.getState();

	// Validate and pick the target blockInstance to paste into
	const results = new ResultPipeline('[BlockManager → pasteBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.pick((data) => ({
			targetBlock: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.validate(() => ({
			clipboardBlock: validateBlockInstance(blockClipboard),
		}))
		.operate((data) => ({
			pastedBlocks: overwriteBlockInTree(data.clipboardBlock, data.targetBlock, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// Update the block store with the new blockInstance tree
	blockStore.updateBlocks(results.pastedBlocks);
}
