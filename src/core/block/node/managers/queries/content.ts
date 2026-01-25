// Stores
import { useBlockStore } from '@/core/block/node/states/store';

// Types
import type { NodeID} from '@/core/block/node/types/instance';
import type { NodeContent } from '@/core/block/node/types/definition';

// Helpers
import { pickNodeContent } from '@/core/block/node/helpers/pickers';
import { validateNodeID } from '@/core/block/node/helpers/validators';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

/**
 * Gets the content data for a specific block.
 * Returns the block's content object or undefined if not found.
 *
 * @param nodeID - The block identifier
 */
export function getNodeContent(nodeID: NodeID): NodeContent | undefined {
	const blockStore = useBlockStore.getState();

	// Validate and pick the block content
	const results = new ResultPipeline('[BlockQueries → getNodeContent]')
		.validate({ nodeID: validateNodeID(nodeID) })
		.pick((data) => ({
			content: pickNodeContent(data.nodeID, blockStore.storedNodes),
		}))
		.execute();
	if (!results) return undefined;

	// Return the block content
	return results.content;
}
