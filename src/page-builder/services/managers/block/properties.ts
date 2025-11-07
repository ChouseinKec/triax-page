// Helpers
import { validateBlockID } from '@/src/page-builder/services/helpers/validate';

// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

// Types
import type { BlockInstance, BlockType, BlockID } from '@/src/page-builder/core/block/block/types';
import type { ElementTag } from '@/src/page-builder/core/block/element/types';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';

/**
 * Reactive hook to get a block's type for block properties operations.
 * Returns the block type and updates reactively when it changes.
 *
 * @param blockID - The block identifier
 * @returns The block type or undefined if block doesn't exist
 *
 * @example
 * useBlockType('block-123') → 'text'
 */
export function useBlockType(blockID: BlockID): BlockType | undefined {
	const safeData = new ValidationPipeline('[BlockManager → useBlockType]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.execute();

	return useBlockStore((state) => (safeData ? state.allBlocks[safeData.blockID]?.type : undefined));
}

/**
 * Reactive hook to get a block's HTML tag for block properties operations.
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
	const safeData = new ValidationPipeline('[BlockManager → useBlockTag]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.execute();

	return useBlockStore((state) => (safeData ? state.allBlocks[safeData.blockID]?.tag : undefined));
}

/**
 * Reactive hook to get a block's ID for block properties operations.
 * Returns the validated block ID and updates reactively.
 *
 * @param blockID - The block identifier to validate
 * @returns The validated block ID or undefined if block doesn't exist
 *
 * @example
 * useBlockID('block-123') → 'block-123'
 */
export function useBlockID(blockID: BlockID): BlockID | undefined {
	const safeData = new ValidationPipeline('[BlockManager → useBlockID]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.execute();

	return useBlockStore((state) => (safeData ? state.allBlocks[safeData.blockID]?.id : undefined));
}

/**
 * Reactive hook to get a block's content block IDs for block properties operations.
 * Returns the array of child block IDs and updates reactively.
 *
 * @param blockID - The block identifier
 * @returns Array of child block IDs or undefined if block doesn't exist
 *
 * @example
 * useBlockContentIDs('block-123') → ['block-456', 'block-789']
 */
export function useBlockContentIDs(blockID: BlockID): BlockID[] | undefined {
	const safeData = new ValidationPipeline('[BlockManager → useBlockContentIDs]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.execute();

	return useBlockStore((state) => (safeData ? state.allBlocks[safeData.blockID]?.contentIDs : []));
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
	const safeData = new ValidationPipeline('[BlockManager → useBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.execute();

	return useBlockStore((state) => (safeData ? state.allBlocks[safeData.blockID] : undefined));
}

/**
 * Sets the HTML tag for a specific block.
 * Updates the block's primary HTML element tag.
 *
 * @param blockID - The block identifier
 * @param tag - The new HTML tag to set
 * @returns void
 *
 * @example
 * setBlockTag('block-123', 'div')
 */
export function setBlockTag(blockID: BlockID, tag: ElementTag): void {
	const safeData = new ValidationPipeline('[BlockManager → setBlockTag]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.execute();

	if (!safeData) return;

	const currentBlock = useBlockStore.getState().allBlocks[blockID];
	if (!currentBlock) return;

	useBlockStore.getState().updateBlocks({ [blockID]: { ...currentBlock, tag } });
}



