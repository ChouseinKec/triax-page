// Stores
import { useBlockStore } from '@/core/block/node/states/store';

// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { NodeData } from '@/core/block/node/types/definition';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { pickNodeInstance, validateNodeID } from '@/core/block/node/helpers';

/**
 * Sets the data for a specific block instance.
 *
 * This operation updates the custom data associated with a block, which may contain
 * user-defined data, configuration, or state information. The new data completely
 * replaces the existing data object. This is typically used for text data, form
 * data, or other dynamic data that changes during user interaction.
 *
 * @param nodeID - The unique identifier of the block instance whose data should be updated
 * @param data - The new data object to assign to the block, replacing any existing data
 * @returns void - This function does not return a value but updates the block store state
 * @see {@link pickNodeData} - For retrieving the current data of a block
 * @see {@link NodeData} - The type definition for block data objects
 */
export function setNodeData(nodeID: NodeID, data: NodeData): void {
	// Validate and pick the blockInstance to update
	const results = new ResultPipeline('[BlockCommands → setNodeData]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, useBlockStore.getState().storedNodes),
		}))
		.execute();
	if (!results) return;

	// Update the block data in the store
	useBlockStore.setState((state) => {
		const updatedNodes = {
			...state.storedNodes,
			[results.nodeID]: { ...results.blockInstance, data },
		};
		return { storedNodes: updatedNodes };
	});
}
