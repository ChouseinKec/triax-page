// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Types
import type { NodeID } from '@/core/block/node/types/instance';

// Helpers
import { validateNodeID, pickNodeStoreState, pickNodeInstance } from '@/core/block/node/helpers';
import { pickNodeAttributes, renderNodeAttributes } from '@/core/block/attribute/helpers/';

// Managers
import { getBlockElementIsAttributeEditable } from '@/core/block/element/managers/queries/definition';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

/**
 * Determines if a block's attributes can be edited based on its element definition.
 *
 * This function checks the element definition of the given block to see if its attributes
 * are editable by users. It delegates to the element's attribute editability check.
 *
 * @param sourceNodeID - The unique identifier of the block to check
 * @returns boolean - True if the block's attributes are editable, false otherwise
 * @see {@link getBlockElementIsAttributeEditable} - The underlying element check
 */
export function canBlockAttributeBeEdited(sourceNodeID: NodeID): boolean {
	const validData = new ResultPipeline('[BlockQueries → canBlockAttributeBeEdited]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			sourceNodeInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return false;

	return getBlockElementIsAttributeEditable(validData.sourceNodeInstance.elementKey);
}

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
export function getBlockAttributesRendered(sourceNodeID: NodeID): Record<string, string | boolean> | undefined {
	const nodeStore = useNodeStore.getState();

	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockQueries → getBlockAttributesRendered]')
		.validate({ sourceNodeID: validateNodeID(sourceNodeID) })
		.pick((data) => ({
			attributes: pickNodeAttributes(data.sourceNodeID, nodeStore.storedNodes),
		}))
		.execute();
	if (!results) return undefined;

	// Render and return the block attributes
	return renderNodeAttributes(results.attributes);
}
