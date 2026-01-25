// Stores
import { useBlockStore } from '@/core/block/node/states/store';

// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { NodeContent } from '@/core/block/node/types/definition';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { pickNodeInstance, validateNodeID } from '@/core/block/node/helpers';

/**
 * Sets the content data for a specific block.
 * Merges the new content with existing content.
 *
 * @param nodeID - The block identifier
 * @param content - The content data to set
 */
export function setNodeContent(nodeID: NodeID, content: NodeContent): void {
	// Validate and pick the blockInstance to update
	const results = new ResultPipeline('[BlockCommands → setNodeContent]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, useBlockStore.getState().storedNodes),
		}))
		.execute();
	if (!results) return;

	// Update the block content in the store
	useBlockStore.setState((state) => {
		const updatedNodes = {
			...state.storedNodes,
			[results.nodeID]: { ...results.blockInstance, content },
		};
		return { storedNodes: updatedNodes };
	});
}
