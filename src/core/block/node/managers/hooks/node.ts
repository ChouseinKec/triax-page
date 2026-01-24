// Stores
import { useBlockStore } from '@/state/block/block';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';
import { devLog } from '@/shared/utilities/dev';

// Types
import type { NodeID, NodeInstance } from '@/core/block/node/types/instance';

// Helpers
import { validateNodeID, pickNodeInstance } from '@/core/block/node/helpers';

/**
 * Reactive hook to get a complete block instance in block queries.
 * Returns the block data and updates reactively when it changes.
 *
 * @param nodeID - The block identifier to retrieve
 */
export function useNode(nodeID: NodeID): NodeInstance | undefined {
	// Validate parameters first
	const results = new ResultPipeline('[BlockQueries → useNode]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.execute();
	if (!results) return undefined;

	// Return a reactive block instance
	return useBlockStore((state) => {
		// Pick and operate on necessary data
		const blockResult = pickNodeInstance(results.nodeID, state.allBlocks);
		if (!blockResult.success) return devLog.error(`[BlockQueries → useNode] Block not found: ${results.nodeID}`), undefined;
		// Return the block instance data
		return blockResult.data;
	});
}
