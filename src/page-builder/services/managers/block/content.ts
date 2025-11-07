// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

// Types
import type { BlockID, BlockContent } from '@/src/page-builder/core/block/block/types';

// Helpers
import { validateBlockID } from '@/src/page-builder/services/helpers/validate';

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
	const safeData = validateBlockID(blockID);
	if (!safeData.valid) return undefined;

	const block = useBlockStore.getState().allBlocks[blockID];
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
	const safeData = validateBlockID(blockID);
	if (!safeData.valid) return undefined;

	return useBlockStore((state) => state.allBlocks[blockID]?.content);
}

/**
 * Sets the content data for a specific block.
 * Merges the new content with existing content.
 *
 * @param blockID - The block identifier
 * @param content - The content data to set
 * @returns void
 *
 * @example
 * setBlockContent('block-123', { text: 'New text', format: 'bold' })
 */
export function setBlockContent(blockID: BlockID, content: BlockContent): void {
	const safeData = validateBlockID(blockID);
	if (!safeData.valid) return;

	const currentBlock = useBlockStore.getState().allBlocks[blockID];
	if (!currentBlock) return;

	useBlockStore.getState().updateBlocks({ [blockID]: { ...currentBlock, content } });
}

/**
 * Updates specific properties in a block's content data.
 * Merges the updates with existing content.
 *
 * @param blockID - The block identifier
 * @param updates - Partial content updates to merge
 * @returns void
 *
 * @example
 * updateBlockContent('block-123', { text: 'Updated text' })
 */
export function updateBlockContent(blockID: BlockID, updates: Partial<BlockContent>): void {
	const safeData = validateBlockID(blockID);
	if (!safeData.valid) return;

	const currentContent = getBlockContent(blockID) || {};
	const newContent = { ...currentContent, ...updates };

	setBlockContent(blockID, newContent);
}