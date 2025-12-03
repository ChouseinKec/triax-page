// Types
import type { BlockID, BlockInstance, BlockInstanceRecord, BlockAttributes, BlockContent } from '@/src/core/block/instance/types';
import type { PickResult } from '@/src/shared/types/result';

/**
 * Fetch a set of block instances for the provided ids in order.
 *
 * @param blockIDs - array of ids to resolve
 * @param storedBlocks - record containing all instances
 */
export function pickBlockInstances(blockIDs: BlockID[], storedBlocks: BlockInstanceRecord): PickResult<BlockInstance[]> {
	const blockCollection: BlockInstance[] = [];

	for (const blockID of blockIDs) {
		// Fetch each block instance by ID
		const blockResult = pickBlockInstance(blockID, storedBlocks);
		if (!blockResult.success) return blockResult;

		// Push the resolved instance into the result array
		blockCollection.push(blockResult.data);
	}

	// Return the array of fetched instances
	return { success: true, data: blockCollection };
}

/**
 * Fetch a block instance from the in-memory store by ID.
 *
 * @param blockID - id of the block to fetch
 * @param storedBlocks - record containing all block instances keyed by id
 */
export function pickBlockInstance(blockID: BlockID, storedBlocks: BlockInstanceRecord): PickResult<BlockInstance> {
	// Lookup the block in the provided record
	const blockInstance = storedBlocks[blockID];
	if (!blockInstance) return { success: false, error: `Block not found: '${blockID}' does not exist in the block collection` };

	// Return the instance
	return { success: true, data: blockInstance };
}

/**
 * Fetch the `content` object for a block instance by id.
 *
 * @param blockID - id of the block whose content should be fetched
 * @param storedBlocks - record containing all block instances keyed by id
 */
export function pickBlockContent(blockID: BlockID, storedBlocks: BlockInstanceRecord): PickResult<BlockContent> {
	// Fetch the block instance first (propagate any fetch error)
	const blockResult = pickBlockInstance(blockID, storedBlocks);
	if (!blockResult.success) return blockResult;

	// Extract the content field — if missing, surface a clear error
	const blockContent = blockResult.data.content;
	if (!blockContent) return { success: false, error: `Block content not found for block: '${blockID}'` };

	// Return the content object
	return { success: true, data: blockContent };
}
