// Types
import type { BlockID, BlockInstanceRecord } from '@/src/core/block/instance/types';
import type { FetchResult } from '@/src/shared/types/result';

// Helpers
import { fetchBlockInstance } from '@/src/core/block/instance/helper/fetchers/instance';

/**
 * Fetch currently selected block id from store-provided ID and verify it exists.
 *
 * @param selectedBlockID - currently selected block id, or null if none is selected
 * @param storedBlocks - record mapping block ids to block instances
 */
export function fetchSelectedBlock(selectedBlockID: BlockID | null, storedBlocks: BlockInstanceRecord): FetchResult<BlockID> {
	// No currently selected block — surface a clear error to callers
	if (!selectedBlockID) return { success: false, error: `No selected block ID provided in the block store` };

	// Validate existence of the selected block id in the stored collection
	const blockResult = fetchBlockInstance(selectedBlockID, storedBlocks);
	if (!blockResult.success) return blockResult;

	// The selection is valid — return the id so callers can act on it
	return { success: true, data: selectedBlockID };
}
