// Stores
import { useBlockStore } from '@/core/block/node/states/store';
import type { HighlightedNode } from '@/core/block/node/types';

// Types
import type { NodeID } from '@/core/block/node/types/instance';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { validateNodeID } from '@/core/block/node/helpers';

/**
 * Sets the currently selected block instance for editing operations.
 *
 * This operation updates the global selection state to focus on a specific block,
 * making it the active target for subsequent editing commands, property changes,
 * and user interactions. Passing null clears the current selection.
 *
 * @param nodeID - The unique identifier of the block to select, or null to clear the selection
 * @returns void - This function does not return a value but updates the block store selection state
 */
export function setSelectedNodeID(nodeID: NodeID | null): void {
	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockCommands → setSelectedNodeID]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.execute();
	if (!results) return;

	// Select the block in the store
	useBlockStore.setState((state) => ({
		...state,
		selectedNodeID: results.nodeID,
	}));
}

/**
 * Sets the highlighted text range within the currently selected block.
 *
 * This operation updates the text highlight state to specify a range of text that
 * is currently selected or highlighted within the active block. This information
 * is used for text manipulation operations like formatting, replacement, or copying.
 * Passing null clears any existing highlight.
 *
 * @param highlightedNode - The highlight data containing start/end offsets and text, or null to clear highlighting
 * @returns void - This function does not return a value but updates the block store highlight state
 */
export function setHighlightNodeText(highlightedNode: HighlightedNode | null): void {
	// Set the highlighted block text in the store
	useBlockStore.setState((state) => ({
		...state,
		highlightedNode: highlightedNode,
	}));
}
