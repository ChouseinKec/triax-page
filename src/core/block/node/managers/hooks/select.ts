// Stores
import { useBlockStore } from '@/core/block/node/states/store';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { NodeKey } from '@/core/block/node/types/definition';
import type { ElementKey } from '@/core/block/element/types';

// Helpers
import { validateNodeID, pickNodeInstance } from '@/core/block/node/helpers';

/**
 * Reactive hook to check if a specific node is currently selected in the editor.
 * Provides real-time updates when the selection state changes.
 * @param nodeID - The unique identifier of the node to check for selection status
 * @returns True if the specified node is currently selected, false otherwise
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
 * Reactive hook to get the ID of the currently selected node in the editor.
 * Returns undefined when no node is selected, enabling conditional rendering.
 * @returns The unique identifier of the currently selected node, or undefined if no selection exists
 */
export function useSelectedNodeID(): NodeID {
	return useBlockStore((state) => state.selectedNodeID);
}

/**
 * Reactive hook to get the definition key (node type) of the currently selected node.
 * Useful for determining the selected node's capabilities and behavior.
 * @returns The definition key identifying the type of the selected node, or undefined if no selection exists
 */
export function useSelectedDefinitionKey(): NodeKey | undefined {
	// Return a reactive block type
	return useBlockStore((state) => {
		// Get the selected block ID
		const selectedNodeID = state.selectedNodeID;

		// Pick the block instance
		const selectedBlock = pickNodeInstance(selectedNodeID, state.storedNodes);
		if (!selectedBlock.success) return undefined;

		// Return the block type
		return selectedBlock.data.definitionKey;
	});
}

/**
 * Reactive hook to get the element key (HTML tag) of the currently selected node.
 * Useful for styling and rendering logic based on the selected node's HTML representation.
 * @returns The element key identifying the HTML tag of the selected node, or undefined if no selection exists
 */
export function useSelectedElementKey(): ElementKey | undefined {
	return useBlockStore((state) => {
		// Get the selected block ID
		const selectedNodeID = state.selectedNodeID;
		if (!selectedNodeID) return undefined;

		// Pick the block instance
		const selectedBlock = pickNodeInstance(selectedNodeID, state.storedNodes);
		if (!selectedBlock.success) return undefined;

		// Return the block tag
		return selectedBlock.data.elementKey;
	});
}

/**
 * Reactive hook to get the parent node ID of the currently selected node.
 * Useful for understanding the hierarchical context of the selection.
 * @returns The unique identifier of the parent node, or undefined if no selection exists or the selected node is a root node
 */
export function useSelectedParentID(): NodeID | undefined {
	return useBlockStore((state) => {
		// Get the selected block ID
		const selectedNodeID = state.selectedNodeID;
		if (!selectedNodeID) return undefined;

		// Pick the block instance
		const selectedBlock = pickNodeInstance(selectedNodeID, state.storedNodes);
		if (!selectedBlock.success) return undefined;

		// Return the parent block ID
		return selectedBlock.data.parentID;
	});
}
