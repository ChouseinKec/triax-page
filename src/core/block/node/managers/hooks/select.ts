// Stores
import { useBlockStore } from '@/state/block/block';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { NodeKey } from '@/core/block/node/types/definition';

// Helpers
import { validateNodeID, pickNodeInstance } from '@/core/block/node/helpers';

/**
 * Reactive hook to check if a specific block is currently selected.
 * @param nodeID - The block identifier to check
 * @returns True if the block is selected, false otherwise
 */
export function useIsNodeSelected(nodeID: NodeID): boolean {
	// Validate parameters first
	const results = new ResultPipeline('[BlockQueries → useIsNodeSelected]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.execute();
	if (!results) return false;

	// Return a reactive selection status
	return useBlockStore((state) => state.selectedNodeID === results.nodeID);
}

/**
 * Reactive hook to get the type of the currently selected block.
 * @returns The selected block type or undefined if no block is selected
 */
export function useSelectedNodeKey(): NodeKey | null {
	// Return a reactive block type
	return useBlockStore((state) => {
		// Get the selected block ID
		const selectedNodeID = state.selectedNodeID;
		if (!selectedNodeID) return null;

		// Pick the block instance
		const selectedBlock = pickNodeInstance(selectedNodeID, state.allBlocks);
		if (!selectedBlock.success) return null;

		// Return the block type
		return selectedBlock.data.type;
	});
}

/**
 * Reactive hook to get the ID of the currently selected block.
 * @returns The selected block ID or undefined if no block is selected
 */
export function useSelectedNodeID(): NodeID | null {
	return useBlockStore((state) => state.selectedNodeID);
}
