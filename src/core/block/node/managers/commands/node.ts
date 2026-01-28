// Stores
import { useBlockStore } from '@/core/block/node/states/store';

// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { ElementKey } from '@/core/block/element/types';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { validateNodeID, pickNodeInstance } from '@/core/block/node/helpers';
import { validateNodeElementKey } from '@/core/block/node/helpers/validators';

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
export function setNodeElementKey(nodeID: NodeID, elementKey: ElementKey): void {
	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockCommands → setNodeElementKey]')
		.validate({
			nodeID: validateNodeID(nodeID),
			elementKey: validateNodeElementKey(elementKey),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, useBlockStore.getState().storedNodes),
		}))
		.execute();
	if (!results) return;

	// Update the block tag in the store
	useBlockStore.setState((state) => {
		const updatedNodes = { ...state.storedNodes };
		updatedNodes[nodeID] = { ...results.blockInstance, elementKey: results.elementKey };
		return { storedNodes: updatedNodes };
	});
}
