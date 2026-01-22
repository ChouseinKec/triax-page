// Stores
import { useBlockStore } from '@/state/block/block';

// Types
import type { NodeID} from '@/core/block/node/instance/types/instance';
import type { NodeContent } from '@/core/block/node/definition/types/definition';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { pickNodeInstance, validateNodeID } from '@/core/block/node/instance/helpers';

/**
 * Sets the content data for a specific block.
 * Merges the new content with existing content.
 *
 * @param nodeID - The block identifier
 * @param content - The content data to set
 */
export function setNodeContent(nodeID: NodeID, content: NodeContent): void {
	const blockStore = useBlockStore.getState();

	// Validate and pick the blockInstance to update
	const results = new ResultPipeline('[BlockCommands → setNodeContent]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// Update the block content in the store
	blockStore.updateBlocks({
		[results.nodeID]: { ...results.blockInstance, content },
	});
}
