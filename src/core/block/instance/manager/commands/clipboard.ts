// Stores
import { useBlockStore } from '@/src/core/block/store';

// Helpers
import { validateBlockID, validateBlockInstance } from '@/src/core/block/instance/helper/validators';
import { pickBlockInstance } from '@/src/core/block/instance/helper/pickers';
import { overwriteBlockInTree } from '@/src/core/block/instance/helper/operations/tree';

// Types
import type { BlockInstance, BlockID, BlockAttributes, BlockStyles } from '@/src/core/block/instance/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Clipboard storage for copy/paste operations
let blockClipboard: BlockInstance | null = null;
let stylesClipboard: BlockStyles | null = null;
let attributesClipboard: BlockAttributes | null = null;

/**
 * Copies a block and all its descendants to the clipboard in block CRUD operations.
 * Stores the complete block tree for later pasting.
 *
 * @param blockID - The block identifier to copy
 * @returns void
 *
 * @example
 * copyBlock('block-123')
 */
export function copyBlock(blockID: BlockID): void {
	const blockStore = useBlockStore.getState();
	const safeData = new ResultPipeline('[BlockManager → copyBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.pick((data) => ({
			block: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	// Store the entire block tree in clipboard
	blockClipboard = JSON.parse(JSON.stringify(safeData.block));
}

/**
 * Pastes a copied block by replacing the target block's content with clipboard content.
 * Maintains the target's position in the hierarchy while updating its type, styles, attributes, and content structure.
 *
 * @param blockID - The block identifier to replace with clipboard content
 * @returns void
 *
 * @example
 * pasteBlock('block-123')
 */
export function pasteBlock(blockID: BlockID): void {
	if (!blockClipboard) return devLog.error(`[BlockManager → pasteBlock] No block in clipboard`), undefined;
	const blockStore = useBlockStore.getState();
	const safeData = new ResultPipeline('[BlockManager → pasteBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.pick((data) => ({
			targetBlock: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.validate(() => ({
			clipboardBlock: validateBlockInstance(blockClipboard),
		}))
		.mutate((data) => ({
			pastedBlocks: overwriteBlockInTree(data.clipboardBlock, data.targetBlock, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	blockStore.updateBlocks(safeData.pastedBlocks);
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
	const blockStore = useBlockStore.getState();
	const safeData = new ResultPipeline('[BlockManager → copyBlockStyles]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.pick((data) => ({
			block: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	stylesClipboard = JSON.parse(JSON.stringify(safeData.block.styles));
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
	if (!stylesClipboard) return devLog.error(`[BlockManager → pasteBlockStyles] No styles in clipboard`), undefined;
	const blockStore = useBlockStore.getState();
	const safeData = new ResultPipeline('[BlockManager → pasteBlockStyles]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.pick((data) => ({
			targetBlock: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	blockStore.updateBlocks({
		[safeData.blockID]: {
			...safeData.targetBlock,
			styles: JSON.parse(JSON.stringify(stylesClipboard)),
		},
	});
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
	const blockStore = useBlockStore.getState();
	const safeData = new ResultPipeline('[BlockManager → copyBlockAttributes]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.pick((data) => ({
			block: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	attributesClipboard = JSON.parse(JSON.stringify(safeData.block.attributes));
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
	if (!attributesClipboard) return devLog.error(`[BlockManager → pasteBlockAttributes] No attributes in clipboard`), undefined;
	const blockStore = useBlockStore.getState();
	const safeData = new ResultPipeline('[BlockManager → pasteBlockAttributes]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.pick((data) => ({
			targetBlock: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	safeData.targetBlock.attributes = JSON.parse(JSON.stringify(attributesClipboard));
	blockStore.updateBlocks({
		[safeData.blockID]: safeData.targetBlock,
	});
}
