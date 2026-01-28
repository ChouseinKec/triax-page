// Types
import type { NodeID, StoredNodes } from '@/core/block/node/types/instance';
import type { NodeData } from '@/core/block/node/types/definition';
import type { PickResult } from '@/shared/types/result';

// Helpers
import { pickNodeInstance } from '@/core/block/node/helpers/pickers/instance';

/**
 * Fetch the data object for a node instance by ID.
 *
 * This function retrieves the custom data associated with a specific node,
 * which may contain user-defined content, configuration, or state information.
 * The data is stored within the node's instance and is separate from its structural properties.
 *
 * @param nodeID - The unique identifier of the node whose data should be fetched
 * @param storedNodes - The record containing all node instances keyed by their IDs
 * @returns A PickResult containing the node's data object or an error if the node/data is not found
 */
export function pickNodeData(nodeID: NodeID, storedNodes: StoredNodes): PickResult<NodeData> {
	// Fetch the block instance first (propagate any fetch error)
	const blockResult = pickNodeInstance(nodeID, storedNodes);
	if (!blockResult.success) return blockResult;

	// Extract the content field — if missing, surface a clear error
	const nodeData = blockResult.data.data;
	if (!nodeData) return { success: false, error: `Block content not found for block: '${nodeID}'` };

	// Return the content object
	return { success: true, data: nodeData };
}
