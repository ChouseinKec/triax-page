// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Types
import type { NodeID, NodeInstance } from '@/core/block/node/types/';
import type { ElementKey } from '@/core/block/element/types';

// Manager
import { getBlockNodeElementKey } from '@/core/block/node/managers';

// Helpers
import { validateNodeID, pickNodeInstance } from '@/core/block/node/helpers';

/**
 * Checks if a specific node is currently selected in the editor.
 *
 * This reactive hook provides real-time updates on whether the specified node is selected,
 * enabling components to highlight or modify behavior based on selection state.
 *
 * @param nodeID - The unique identifier of the node to check for selection status
 * @returns boolean - True if the specified node is currently selected, false otherwise
 */
export function useBlockNodeIsSelected(sourceNodeID: NodeID): boolean {
	// Validate parameters first
	const results = new ResultPipeline('[BlockQueries → useBlockNodeIsSelected]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.execute();
	if (!results) return false;

	// Return a reactive selection status
	return useNodeStore((state) => state.selectedNodeID === results.sourceNodeID);
}

/**
 * Retrieves all node instances from the store.
 *
 * This reactive hook accesses the node store to get an array of all node instances,
 * and updates reactively when any node is added, removed, or modified.
 *
 * @returns NodeInstance[] - An array of all node instances in the store
 * @see {@link getNodeInstances} - The underlying manager query
 */
export function useBlockNodes(): NodeInstance[] {
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
 */
export function useBlockNode(sourceNodeID: NodeID): NodeInstance | undefined {
	return useNodeStore((state) => {
		const blockInstance = pickNodeInstance(sourceNodeID, state.storedNodes);
		return blockInstance.success ? blockInstance.data : undefined;
	});
}

export function useBlockNodeElementKey(sourceNodeID: NodeID): ElementKey | undefined {
	return useNodeStore((state) => {
		const blockInstance = pickNodeInstance(sourceNodeID, state.storedNodes);
		if (!blockInstance.success) return undefined;

		return getBlockNodeElementKey(sourceNodeID);
	});
}
