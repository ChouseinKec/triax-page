// Stores
import { useBlockStore } from '@/state/block/block';

// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { ElementKey } from '@/core/block/element/types';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { validateNodeID, pickNodeInstance } from '@/core/block/node/helpers';
import { validateBlockTag } from '@/core/block/node/helpers/validators';

/**
 * Sets the HTML tag for a specific block.
 * Updates the block's primary HTML element tag.
 *
 * @param nodeID - The block identifier
 * @param tag - The new HTML tag to set
 */
export function setNodeTag(nodeID: NodeID, blockTag: ElementKey): void {
	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockCommands → setNodeTag]')
		.validate({
			nodeID: validateNodeID(nodeID),
			blockTag: validateBlockTag(blockTag),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, useBlockStore.getState().allBlocks),
		}))
		.execute();
	if (!results) return;

	// Update the block tag in the store
	useBlockStore.getState().updateBlocks({ [nodeID]: { ...results.blockInstance, tag: results.blockTag } });
}
