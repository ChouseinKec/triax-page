// Types
import type { BlockID, BlockInstanceRecord, BlockAttributes } from '@/src/core/block/instance/types';
import type { PickResult } from '@/src/shared/types/result';

// Helper
import { pickBlockInstance } from '@/src/core/block/instance/helpers/pickers/instance';

/**
 * Fetch the attributes object for a block instance by id.
 *
 * @param blockID - id of the block whose attributes should be fetched
 * @param storedBlocks - record containing all block instances keyed by id
 */
export function pickBlockAttributes(blockID: BlockID, storedBlocks: BlockInstanceRecord): PickResult<BlockAttributes> {
	// Resolve block instance
	const blockResult = pickBlockInstance(blockID, storedBlocks);
	if (!blockResult.success) return blockResult;

	// Return attributes if present — otherwise return a helpful error
	const blockAttributes = blockResult.data.attributes;
	if (!blockAttributes) return { success: false, error: `Block attributes not found for block: '${blockID}'` };

	return { success: true, data: blockAttributes };
}
