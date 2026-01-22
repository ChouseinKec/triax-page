// Stores
import { useBlockStore } from '@/state/block/block';

// Types
import type { NodeID} from '@/core/block/node/instance/types';
import type { NodeContent } from '@/core/block/node/definition/types';

// Helpers
import { pickNodeContent } from '@/core/block/node/instance/helpers/pickers';
import { validateNodeID } from '@/core/block/node/instance/helpers/validators';

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
			content: pickNodeContent(data.nodeID, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return undefined;

	// Return the block content
	return results.content;
}
