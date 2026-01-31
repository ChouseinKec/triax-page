// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Types
import type { NodeData, NodeID } from '@/core/block/node/types/';
import type { ElementKey } from '@/core/block/element/types';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { validateNodeID, pickNodeInstance } from '@/core/block/node/helpers';
import { validateNodeElementKey } from '@/core/block/node/helpers/validators';
import { pickNodeStoreState } from '@/core/block/node/helpers';

/**
 * Sets the element key for a specific block instance.
 *
 * This operation updates the primary element type of a block, changing how it
 * renders and behaves in the page structure. The element key determines the
 * HTML element or component used to display the block's content and influences
 * its styling, interaction capabilities, and child element compatibility rules.
 *
 * @param nodeID - The unique identifier of the block instance whose element key should be updated
 * @param elementKey - The new element key to assign, defining the block's rendering behavior
 * @returns void - This function does not return a value but updates the block store state
 * @see {@link validateNodeElementKey} - The validation function used for element key compatibility
 * @see {@link ElementKey} - The type definition for element keys
 */
export function setNodeInstanceElementKey(nodeID: NodeID, elementKey: ElementKey): void {
	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockCommands → setNodeInstanceElementKey]')
		.validate({
			nodeID: validateNodeID(nodeID),
			elementKey: validateNodeElementKey(elementKey),
		})
		.pick(() => ({
			nodeStore: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, data.nodeStore.storedNodes),
		}))
		.execute();
	if (!results) return;

	// Update the block tag in the store
	useNodeStore.setState((state) => {
		const updatedNodes = { ...state.storedNodes };
		updatedNodes[nodeID] = { ...results.blockInstance, elementKey: results.elementKey };
		return { storedNodes: updatedNodes };
	});
}

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
export function setNodeInstanceData(nodeID: NodeID, nodeData: NodeData): void {
	// Validate and pick the blockInstance to update
	const results = new ResultPipeline('[BlockCommands → setNodeInstanceData]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!results) return;

	// Update the block data in the store
	useNodeStore.setState((state) => {
		const updatedNodes = {
			...state.storedNodes,
			[results.nodeID]: { ...results.blockInstance, data: nodeData },
		};
		return { storedNodes: updatedNodes };
	});
}
