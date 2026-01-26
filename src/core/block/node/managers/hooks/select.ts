// Stores
import { useBlockStore } from '@/core/block/node/states/store';
import type { HighlightedNode } from '@/core/block/node/types';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { NodeKey } from '@/core/block/node/types/definition';
import type { ElementKey } from '@/core/block/element/types';

// Helpers
import { validateNodeID, pickNodeInstance } from '@/core/block/node/helpers';

/**
 * Reactive hook to check if a specific block is currently selected.
 * @param nodeID - The block identifier to check
 * @returns True if the block is selected, false otherwise
 */
export function useIsNodeSelected(nodeID: NodeID): boolean {
	// Validate parameters first
	const results = new ResultPipeline('[BlockQueries → useIsNodeSelected]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.execute();
	if (!results) return false;

	// Return a reactive selection status
	return useBlockStore((state) => state.selectedNodeID === results.nodeID);
}

/**
 * Reactive hook to get the type of the currently selected block.
 * @returns The selected block type or undefined if no block is selected
 */
export function useSelectedNodeKey(): NodeKey | null {
	// Return a reactive block type
	return useBlockStore((state) => {
		// Get the selected block ID
		const selectedNodeID = state.selectedNodeID;
		if (!selectedNodeID) return null;

		// Pick the block instance
		const selectedBlock = pickNodeInstance(selectedNodeID, state.storedNodes);
		if (!selectedBlock.success) return null;

		// Return the block type
		return selectedBlock.data.type;
	});
}

/**
 * Reactive hook to get the ID of the currently selected block.
 * @returns The selected block ID or undefined if no block is selected
 */
export function useSelectedNodeID(): NodeID | null {
	return useBlockStore((state) => state.selectedNodeID);
}

/**
 * Reactive hook to get the highlighted text of the currently selected block.
 * @returns The highlighted block text or null if no text is highlighted
 */
export function useHighlightText(): HighlightedNode {
	return useBlockStore((state) => state.highlightedNode);
}

/**
 * Reactive hook to get the tag of the currently selected block.
 * @returns The selected block tag or null if no block is selected
 */
export function useSelectedNodeTag(): ElementKey | null {
	return useBlockStore((state) => {
		// Get the selected block ID
		const selectedNodeID = state.selectedNodeID;
		if (!selectedNodeID) return null;

		// Pick the block instance
		const selectedBlock = pickNodeInstance(selectedNodeID, state.storedNodes);
		if (!selectedBlock.success) return null;

		// Return the block tag
		return selectedBlock.data.tag;
	});
}
