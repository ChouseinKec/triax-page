// Stores
import { useBlockStore } from '@/core/block/node/states/store';

// Types
import type { NodeID } from '@/core/block/node/types';

// Helpers
import { validateNodeID, pickNodeInstance } from '@/core/block/node/helpers';
import { pickElementDefinition } from '@/core/block/element/helpers';

// Registry
import { getRegisteredElements } from '@/core/block/element/states/registry';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

/**
 * Determines whether a node can contain child elements based on its element definition.
 * Checks if the node's element type permits any child content at all.
 * @param nodeID - The ID of the node to check for child-bearing capability
 * @returns True if the node can have children (allowedChildren is undefined, null, or non-empty), false otherwise
 */
export function canNodeHaveChildren(nodeID: NodeID): boolean {
	const blockStore = useBlockStore.getState();
	const results = new ResultPipeline('[BlockQueries → canNodeHaveChildren]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, blockStore.storedNodes),
		}))
		.pick((data) => ({
			elementDefinition: pickElementDefinition(data.blockInstance.tag, getRegisteredElements()),
		}))
		.execute();
	if (!results) return false;

	// If allowedChildren is undefined or null, the block can have any children
	if (results.elementDefinition.allowedChildren == null) return true;

	// Check if there are any allowed children
	return results.elementDefinition.allowedChildren.length > 0;
}
