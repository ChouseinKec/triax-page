// Stores
import { useBlockStore } from '@/state/block/block';

// Types
import type { NodeID } from '@/core/block/node/types/instance';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { validateNodeID } from '@/core/block/node/helpers';

/**
 * Selects a block as the currently active block for editing in block CRUD operations.
 * Sets the selected block ID in the store.
 *
 * @param nodeID - The block identifier to select, or null to clear selection
 */
export function selectNode(nodeID: NodeID | null): void {
	const blockStore = useBlockStore.getState();

	// If null, clear selection
	if (nodeID === null) return blockStore.selectNode(null);

	// If already selected, do nothing
	if (nodeID === blockStore.selectedNodeID) return;

	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockCommands → selectNode]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.execute();
	if (!results) return;

	// Select the block in the store
	blockStore.selectNode(results.nodeID);
}
