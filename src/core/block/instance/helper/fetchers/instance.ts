// Types
import type { BlockID, BlockInstance, BlockInstanceRecord, BlockAttributes, BlockContent } from '@/src/core/block/instance/types';
import type { FetchResult } from '@/src/shared/types/result';

/**
 * Fetch a block instance from the in-memory store by ID.
 *
 * @param blockID - id of the block to fetch
 * @param storedBlocks - record containing all block instances keyed by id
 */
export function fetchBlockInstance(blockID: BlockID, storedBlocks: BlockInstanceRecord): FetchResult<BlockInstance> {
	// Lookup the block in the provided record
	const blockInstance = storedBlocks[blockID];
	if (!blockInstance) return { success: false, error: `Block not found: '${blockID}' does not exist in the block collection` };

	// Return the instance
	return { success: true, data: blockInstance };
}

/**
 * Fetch a set of block instances for the provided ids in order.
 *
 * @param blockIDs - array of ids to resolve
 * @param storedBlocks - record containing all instances
 */
export function fetchBlockInstances(blockIDs: BlockID[], storedBlocks: BlockInstanceRecord): FetchResult<BlockInstance[]> {
	const blockCollection: BlockInstance[] = [];

	for (const blockID of blockIDs) {
		// Fetch each block instance by ID
		const blockResult = fetchBlockInstance(blockID, storedBlocks);
		if (!blockResult.success) return blockResult;

		// Push the resolved instance into the result array
		blockCollection.push(blockResult.data);
	}

	// Return the array of fetched instances
	return { success: true, data: blockCollection };
}

/**
 * Fetch the `content` object for a block instance by id.
 *
 * @param blockID - id of the block whose content should be fetched
 * @param storedBlocks - record containing all block instances keyed by id
 */
export function fetchBlockContent(blockID: BlockID, storedBlocks: BlockInstanceRecord): FetchResult<BlockContent> {
	// Fetch the block instance first (propagate any fetch error)
	const blockResult = fetchBlockInstance(blockID, storedBlocks);
	if (!blockResult.success) return blockResult;

	// Extract the content field — if missing, surface a clear error
	const blockContent = blockResult.data.content;
	if (!blockContent) return { success: false, error: `Block content not found for block: '${blockID}'` };

	// Return the content object
	return { success: true, data: blockContent };
}

/**
 * Fetch the attributes object for a block instance by id.
 *
 * @param blockID - id of the block whose attributes should be fetched
 * @param storedBlocks - record containing all block instances keyed by id
 */
export function fetchBlockAttributes(blockID: BlockID, storedBlocks: BlockInstanceRecord): FetchResult<BlockAttributes> {
	// Resolve block instance
	const blockResult = fetchBlockInstance(blockID, storedBlocks);
	if (!blockResult.success) return blockResult;

	// Return attributes if present — otherwise return a helpful error
	const blockAttributes = blockResult.data.attributes;
	if (!blockAttributes) return { success: false, error: `Block attributes not found for block: '${blockID}'` };

	return { success: true, data: blockAttributes };
}
