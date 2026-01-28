// Types
import type { NodeID, NodeInstance, StoredNodes } from '@/core/block/node/types/instance';
import type { PickResult } from '@/shared/types/result';

/**
 * Fetch a node instance from the in-memory store by ID.
 *
 * This function looks up a specific node instance in the stored nodes collection
 * using its unique identifier. It's a fundamental operation for accessing node
 * properties, relationships, and state information.
 *
 * @param nodeID - The unique identifier of the node to fetch
 * @param storedNodes - The record containing all node instances keyed by their IDs
 * @returns A PickResult containing the node instance or an error if the node is not found
 */
export function pickNodeInstance(nodeID: NodeID, storedNodes: StoredNodes): PickResult<NodeInstance> {
	// Lookup the block in the provided record
	const blockInstance = storedNodes[nodeID];
	if (!blockInstance) return { success: false, error: `Block not found: '${nodeID}' does not exist in the block collection` };

	// Return the instance
	return { success: true, data: blockInstance };
}

/**
 * Fetch multiple node instances for the provided IDs in order.
 *
 * This function resolves an array of node IDs to their corresponding instances,
 * maintaining the order of the input array. It's useful for batch operations
 * that need to work with multiple nodes simultaneously.
 *
 * @param nodeIDs - An array of unique node identifiers to resolve
 * @param storedNodes - The record containing all node instances keyed by their IDs
 * @returns A PickResult containing an array of node instances or an error if any node is not found
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
