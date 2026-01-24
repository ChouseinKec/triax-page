// Stores
import { useBlockStore } from '@/state/block/block';

// Types
import type { NodeID } from '@/core/block/node/types/instance';

// Helpers
import { validateNodeID } from '@/core/block/node/helpers';
import { pickNodeAttributes, renderNodeAttributes } from '@/core/block/attribute/helpers/';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

/**
 * Reactive hook to get rendered HTML attributes for a block in block rendering operations.
 * Processes block attributes for HTML rendering with any necessary transformations.
 *
 * @param nodeID - The block identifier
 */
export function getNodeRenderedAttributes(nodeID: NodeID): Record<string, string | boolean> | undefined {
	const blockStore = useBlockStore.getState();

	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockQueries → getNodeRenderedAttributes]')
		.validate({ nodeID: validateNodeID(nodeID) })
		.pick((data) => ({
			attributes: pickNodeAttributes(data.nodeID, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return undefined;

	// Render and return the block attributes
	return renderNodeAttributes(results.attributes);
}
