// Stores
import { useBlockStore } from '@/src/state/block/block';

// Helpers
import { validateBlockID } from '@/src/core/block/instance/helpers/validators';
import { pickBlockInstance } from '@/src/core/block/instance/helpers/pickers';

// Types
import type { BlockID, BlockStyles } from '@/src/core/block/instance/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

let stylesClipboard: BlockStyles | null = null;

/**
 * Copies the styles of a blockInstance to the clipboard in blockInstance CRUD operations.
 * Stores the blockInstance styles for later pasting.
 *
 * @param blockID - The blockInstance identifier to copy styles from
 */
export function copyBlockStyles(blockID: BlockID): void {
	const blockStore = useBlockStore.getState();

	// Validate and pick the blockInstance to copy styles from
	const results = new ResultPipeline('[BlockManager → copyBlockStyles]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// Store the styles in clipboard
	stylesClipboard = JSON.parse(JSON.stringify(results.blockInstance.styles));
}

/**
 * Pastes copied styles to a target blockInstance in blockInstance CRUD operations.
 * Applies the styles from clipboard to the specified blockInstance.
 *
 * @param blockID - The blockInstance identifier to paste styles to
 */
export function pasteBlockStyles(blockID: BlockID): void {
	if (!stylesClipboard) return devLog.error(`[BlockManager → pasteBlockStyles] No styles in clipboard`), undefined;
	const blockStore = useBlockStore.getState();

	// Validate and pick the target blockInstance to paste styles into
	const results = new ResultPipeline('[BlockManager → pasteBlockStyles]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.pick((data) => ({
			targetBlock: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// Update the target blockInstance with styles from clipboard
	blockStore.updateBlocks({
		[results.blockID]: {
			...results.targetBlock,
			styles: JSON.parse(JSON.stringify(stylesClipboard)),
		},
	});
}
