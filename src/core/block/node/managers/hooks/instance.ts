// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Types
import type { NodeID, NodeInstance } from '@/core/block/node/types/instance';

// Manager
import { getNodeInstance } from '@/core/block/node/managers/';

/**
 * Retrieves all node instances from the store.
 *
 * This reactive hook accesses the node store to get an array of all node instances,
 * and updates reactively when any node is added, removed, or modified.
 *
 * @returns NodeInstance[] - An array of all node instances in the store
 * @see {@link getNodeInstances} - The underlying manager query
 */
export function useNodeInstances(): NodeInstance[] {
	// Return all reactive block instances
	return useNodeStore((state) => {
		// Map stored nodes to their instances
		return Object.values(state.storedNodes);
	});
}

/**
 * Retrieves a complete node instance by its ID.
 *
 * This reactive hook accesses the node store to get the full node instance data,
 * including its properties, and updates reactively when the node changes.
 *
 * @param nodeID - The unique identifier of the node instance to retrieve
 * @returns NodeInstance | undefined - The complete node instance, or undefined if the node is not found
 * @see {@link getNodeInstance} - The underlying manager query
 */
export function useNodeInstance(nodeID: NodeID): NodeInstance | undefined {
	// Return a reactive block instance
	return useNodeStore(() => {
		// Return the block instance data
		return getNodeInstance(nodeID);
	});
}
