// Types
import type { NodeID, NodeInstance, StoredNodes } from '@/core/block/node/types/instance';
import type { PickResult } from '@/shared/types/result';

/**
 * Fetch a block instance from the in-memory store by ID.
 *
 * @param nodeID - id of the block to fetch
 * @param storedNodes - record containing all block instances keyed by id
 */
export function pickNodeInstance(nodeID: NodeID, storedNodes: StoredNodes): PickResult<NodeInstance> {
	// Lookup the block in the provided record
	const blockInstance = storedNodes[nodeID];
	if (!blockInstance) return { success: false, error: `Block not found: '${nodeID}' does not exist in the block collection` };

	// Return the instance
	return { success: true, data: blockInstance };
}

/**
 * Fetch a set of block instances for the provided ids in order.
 *
 * @param nodeIDs - array of ids to resolve
 * @param storedNodes - record containing all instances
 */
export function pickNodeInstances(nodeIDs: NodeID[], storedNodes: StoredNodes): PickResult<NodeInstance[]> {
	const blockCollection: NodeInstance[] = [];

	for (const nodeID of nodeIDs) {
		// Fetch each block instance by ID
		const blockResult = pickNodeInstance(nodeID, storedNodes);
		if (!blockResult.success) return blockResult;

		// Push the resolved instance into the result array
		blockCollection.push(blockResult.data);
	}

	// Return the array of fetched instances
	return { success: true, data: blockCollection };
}
