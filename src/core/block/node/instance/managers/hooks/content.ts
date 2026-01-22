// Stores
import { useBlockStore } from '@/state/block/block';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';
import { devLog } from '@/shared/utilities/dev';

// Types
import type { NodeID} from '@/core/block/node/instance/types/instance';
import type { NodeContent } from '@/core/block/node/definition/types/definition';

// Helpers
import { validateNodeID, pickNodeInstance } from '@/core/block/node/instance/helpers';

/**
 * React hook to get the content data for a specific block.
 * Returns the block's content object or undefined if not found.
 *
 * @param nodeID - The block identifier
 */
export function useNodeContent(nodeID: NodeID): NodeContent | undefined {
	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockQueries → useNodeContent]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.execute();
	if (!results) return undefined;

	// Return a reactive content value
	return useBlockStore((state) => {
		// Pick and operate on necessary data
		const blockResult = pickNodeInstance(results.nodeID, state.allBlocks);
		if (!blockResult.success) return devLog.error(`[BlockQueries → useNodeContent] Block not found: ${results.nodeID}`), undefined;
		// Return the block content data
		return blockResult.data.content;
	});
}
