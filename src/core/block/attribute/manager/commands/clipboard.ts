// Stores
import { useBlockStore } from '@/src/core/block/store';

// Helpers
import { validateBlockID } from '@/src/core/block/instance/helper/validators';
import { pickBlockInstance } from '@/src/core/block/instance/helper/pickers';

// Types
import type { BlockID, BlockAttributes } from '@/src/core/block/instance/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Clipboard storage for copy/paste operations
let attributesClipboard: BlockAttributes | null = null;

/**
 * Copies the attributes of a blockInstance to the clipboard in blockInstance CRUD operations.
 * Stores the blockInstance attributes for later pasting.
 *
 * @param blockID - The blockInstance identifier to copy attributes from
 */
export function copyBlockAttributes(blockID: BlockID): void {
	const blockStore = useBlockStore.getState();

	// Validate and pick the blockInstance to copy attributes from
	const results = new ResultPipeline('[BlockManager → copyBlockAttributes]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// Store the attributes in clipboard
	attributesClipboard = JSON.parse(JSON.stringify(results.blockInstance.attributes));
}

/**
 * Pastes copied attributes to a target blockInstance in blockInstance CRUD operations.
 * Applies the attributes from clipboard to the specified blockInstance.
 *
 * @param blockID - The blockInstance identifier to paste attributes to
 */
export function pasteBlockAttributes(blockID: BlockID): void {
	if (!attributesClipboard) return devLog.error(`[BlockManager → pasteBlockAttributes] No attributes in clipboard`), undefined;
	const blockStore = useBlockStore.getState();

	// Validate and pick the target blockInstance to paste attributes into
	const results = new ResultPipeline('[BlockManager → pasteBlockAttributes]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.pick((data) => ({
			targetBlock: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// Update the target blockInstance with attributes from clipboard
	blockStore.updateBlocks({
		[results.blockID]: {
			...results.targetBlock,
			attributes: JSON.parse(JSON.stringify(attributesClipboard)),
		},
	});
}
