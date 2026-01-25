// Stores
import { useBlockStore } from '@/core/block/node/states/store';
import type { HighlightedNodeText } from '@/core/block/node/states/store';

// Types
import type { NodeID } from '@/core/block/node/types/instance';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { validateNodeID } from '@/core/block/node/helpers';

/**
 * Selects a block as the currently active block for editing in block CRUD operations.
 * Sets the selected block ID in the store.
 *
 * @param nodeID - The block identifier to select, or null to clear selection
 */
export function selectNode(nodeID: NodeID | null): void {
	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockCommands → selectNode]')
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
 * Sets the highlighted text for the currently selected block.
 *
 * @param textHighlight - The text highlight object to set, or null to clear
 */
export function setHighlightedNodeText(textHighlight: HighlightedNodeText): void {
	// Set the highlighted block text in the store
	useBlockStore.setState((state) => ({
		...state,
		highlightedNodeText: textHighlight,
	}));
}
