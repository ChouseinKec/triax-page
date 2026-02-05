// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Types
import type { NodeID } from '@/core/block/node/types/instance';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { validateNodeID } from '@/core/block/node/helpers';

/**
 * Sets the currently selected block instance for editing operations.
 *
 * This operation updates the global selection state to focus on a specific block,
 * making it the active target for subsequent editing commands, property changes,
 * and user interactions. Passing null clears the current selection.
 *
 * @param nodeID - The unique identifier of the block to select, or null to clear the selection
 * @returns void - This function does not return a value but updates the block store selection state
 */
export function setBlockNodeSelectedNodeID(nodeID: NodeID): void {
	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockCommands → setBlockNodeSelectedNodeID]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.execute();
	if (!results) return;

	// Select the block in the store
	useNodeStore.setState((state) => ({
		...state,
		selectedNodeID: results.nodeID,
	}));
}
