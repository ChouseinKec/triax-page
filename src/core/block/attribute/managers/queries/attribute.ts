// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Types
import type { NodeID } from '@/core/block/node/types/instance';

// Helpers
import { validateNodeID } from '@/core/block/node/helpers';
import { pickNodeAttributes, renderNodeAttributes } from '@/core/block/attribute/helpers/';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

/**
 * Retrieves rendered HTML attributes for a block in rendering operations.
 *
 * This function processes and transforms a block's attributes into a format suitable
 * for HTML rendering. It handles attribute validation, type conversion, and any
 * necessary transformations (such as converting boolean attributes or handling special cases).
 * The returned object can be directly spread into JSX or used for HTML generation.
 *
 * @param sourceNodeID - The unique identifier of the block to retrieve rendered attributes for
 * @returns An object containing the rendered attributes as key-value pairs, or undefined if the block is invalid
 * @see {@link pickNodeAttributes} - Helper function used to extract raw attributes from nodes
 * @see {@link renderNodeAttributes} - Function that performs the attribute rendering transformation
 */
export function getNodeRenderedAttributes(sourceNodeID: NodeID): Record<string, string | boolean> | undefined {
	const nodeStore = useNodeStore.getState();

	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockQueries → getNodeRenderedAttributes]')
		.validate({ sourceNodeID: validateNodeID(sourceNodeID) })
		.pick((data) => ({
			attributes: pickNodeAttributes(data.sourceNodeID, nodeStore.storedNodes),
		}))
		.execute();
	if (!results) return undefined;

	// Render and return the block attributes
	return renderNodeAttributes(results.attributes);
}
