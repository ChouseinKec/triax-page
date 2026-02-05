// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Types
import type { NodeHighlight } from '@/core/block/node/types/';

// Helpers
import { pickNodeStoreState } from '@/core/block/node/helpers/pickers';
import { pickHighlightedNode } from '@/core/block/node/helpers/pickers';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline';

/**
 * Retrieves the currently highlighted node from the block store.
 *
 * This function queries the node store to obtain information about the currently
 * highlighted node within the editor. The highlighted node typically represents
 * a text selection or focus area that the user is interacting with.
 *
 * If no node is highlighted or if there's an error accessing the store state,
 * the function returns undefined.
 *
 * @returns The highlighted node data, or null if no node is highlighted, or undefined on error */
export function getBlockNodeHighlight(): NodeHighlight | undefined {
	const validData = new ResultPipeline('[BlockQueries → getBlockNodeHighlight]')
		.pick(() => ({
			blockStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			highlightedNode: pickHighlightedNode(data.blockStoreState),
		}))
		.execute();
	if (!validData) return undefined;

	return validData.highlightedNode;
}
