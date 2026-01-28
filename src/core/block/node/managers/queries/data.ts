// Stores
import { useBlockStore } from '@/core/block/node/states/store';

// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { NodeData } from '@/core/block/node/types/definition';

// Helpers
import { pickNodeData } from '@/core/block/node/helpers/pickers';
import { validateNodeID } from '@/core/block/node/helpers/validators';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

/**
 * Gets the content data for a specific block.
 * Returns the block's content object or undefined if not found.
 *
 * @param nodeID - The block identifier
 */
export function getNodeData(nodeID: NodeID): NodeData | undefined {
	// Validate and pick the block content
	const validData = new ResultPipeline('[BlockQueries → getNodeData]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			data: pickNodeData(data.nodeID, useBlockStore.getState().storedNodes),
		}))
		.execute();
	if (!validData) return undefined;

	// Return the block content
	return validData.data;
}
