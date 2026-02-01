// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Types
import type { NodeID } from '@/core/block/node/types/';

// Helpers
import { validateNodeID } from '@/core/block/node/helpers';

// Managers
import { isNodeStyleEditable, isNodeAttributeEditable, isNodeDeletable, isNodeCopyable, isNodeCloneable, isNodeOrderable } from '@/core/block/node/managers/queries/instance';

/**
 * Checks if a specific node is currently selected in the editor.
 *
 * This reactive hook provides real-time updates on whether the specified node is selected,
 * enabling components to highlight or modify behavior based on selection state.
 *
 * @param nodeID - The unique identifier of the node to check for selection status
 * @returns boolean - True if the specified node is currently selected, false otherwise
 */
export function useNodeIsSelected(nodeID: NodeID): boolean {
	// Validate parameters first
	const results = new ResultPipeline('[BlockQueries → useNodeIsSelected]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.execute();
	if (!results) return false;

	// Return a reactive selection status
	return useNodeStore((state) => state.selectedNodeID === results.nodeID);
}

/**
 * Checks if a specific node's styles can be edited.
 *
 * This hook determines whether the styles of the given node are editable,
 * based on its element definition. It provides a reactive way to access this information.
 *
 * @param nodeID - The unique identifier of the node to check
 * @returns boolean - True if the node's styles are editable, false otherwise
 * @see {@link isNodeStyleEditable} - The underlying query function
 */
export function useNodeIsStyleEditable(nodeID: NodeID): boolean {
	return isNodeStyleEditable(nodeID);
}

/**
 * Checks if a specific node's attributes can be edited.
 *
 * This hook determines whether the attributes of the given node are editable,
 * based on its element definition. It provides a reactive way to access this information.
 *
 * @param nodeID - The unique identifier of the node to check
 * @returns boolean - True if the node's attributes are editable, false otherwise
 * @see {@link isNodeAttributeEditable} - The underlying query function
 */
export function useNodeIsAttributeEditable(nodeID: NodeID): boolean {
	return isNodeAttributeEditable(nodeID);
}

/**
 * Checks if a specific node can be deleted.
 *
 * This hook determines whether the given node can be deleted,
 * based on its element definition. It provides a reactive way to access this information.
 *
 * @param nodeID - The unique identifier of the node to check
 * @returns boolean - True if the node is deletable, false otherwise
 * @see {@link isNodeDeletable} - The underlying query function
 */
export function useNodeIsDeletable(nodeID: NodeID): boolean {
	return isNodeDeletable(nodeID);
}

/**
 * Checks if a specific node can be copied.
 *
 * This hook determines whether the given node can be copied,
 * based on its element definition. It provides a reactive way to access this information.
 *
 * @param nodeID - The unique identifier of the node to check
 * @returns boolean - True if the node is copyable, false otherwise
 * @see {@link isNodeCopyable} - The underlying query function
 */
export function useNodeIsCopyable(nodeID: NodeID): boolean {
	return isNodeCopyable(nodeID);
}

/**
 * Checks if a specific node can be cloned.
 *
 * This hook determines whether the given node can be cloned,
 * based on its element definition. It provides a reactive way to access this information.
 *
 * @param nodeID - The unique identifier of the node to check
 * @returns boolean - True if the node is cloneable, false otherwise
 * @see {@link isNodeCloneable} - The underlying query function
 */
export function useNodeIsCloneable(nodeID: NodeID): boolean {
	return isNodeCloneable(nodeID);
}

/**
 * Checks if a specific node can be reordered.
 *
 * This hook determines whether the given node can be reordered,
 * based on its element definition. It provides a reactive way to access this information.
 *
 * @param nodeID - The unique identifier of the node to check
 * @returns boolean - True if the node is orderable, false otherwise
 * @see {@link isNodeOrderable} - The underlying query function
 */
export function useNodeIsOrderable(nodeID: NodeID): boolean {
	return isNodeOrderable(nodeID);
}
