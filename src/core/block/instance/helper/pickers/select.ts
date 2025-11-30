// Types
import type { BlockID, BlockInstanceRecord } from '@/src/core/block/instance/types';
import type { PickResult } from '@/src/shared/types/result';

// Helpers
import { pickBlockInstance } from '@/src/core/block/instance/helper/pickers/instance';

/**
 * Fetch currently selected block id from store-provided ID and verify it exists.
 *
 * @param selectedBlockID - currently selected block id, or null if none is selected
 * @param storedBlocks - record mapping block ids to block instances
 */
export function pickSelectedBlock(selectedBlockID: BlockID | null, storedBlocks: BlockInstanceRecord): PickResult<BlockID> {
	// No currently selected block — surface a clear error to callers
	if (!selectedBlockID) return { success: false, error: `No selected block ID provided in the block store` };

	// Validate existence of the selected block id in the stored collection
	const blockResult = pickBlockInstance(selectedBlockID, storedBlocks);
	if (!blockResult.success) return blockResult;

	// The selection is valid — return the id so callers can act on it
	return { success: true, data: selectedBlockID };
}
