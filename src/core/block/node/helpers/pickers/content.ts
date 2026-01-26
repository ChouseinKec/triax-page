// Types
import type { NodeID, StoredNodes } from '@/core/block/node/types/instance';
import type { NodeContent } from '@/core/block/node/types/definition';
import type { PickResult } from '@/shared/types/result';

// Helpers
import { pickNodeInstance } from '@/core/block/node/helpers/pickers/instance';

/**
 * Fetch the `content` object for a block instance by id.
 *
 * @param nodeID - id of the block whose content should be fetched
 * @param storedNodes - record containing all block instances keyed by id
 */
export function pickNodeContent(nodeID: NodeID, storedNodes: StoredNodes): PickResult<NodeContent> {
	// Fetch the block instance first (propagate any fetch error)
	const blockResult = pickNodeInstance(nodeID, storedNodes);
	if (!blockResult.success) return blockResult;

	// Extract the content field — if missing, surface a clear error
	const nodeContent = blockResult.data.content;
	if (!nodeContent) return { success: false, error: `Block content not found for block: '${nodeID}'` };

	// Return the content object
	return { success: true, data: nodeContent };
}
