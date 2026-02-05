import { useMemo } from 'react';

// Types
import type { ElementKey } from '@/core/block/element/types';
import type { NodeID } from '@/core/block/node/types/instance';

// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Helpers
import { pickNodeInstance } from '@/core/block/node/helpers/pickers/instance';


// Managers
import { getBlockNodeCompatibleElementKeys, useSelectedBlockNodeParentID } from '@/core/block/node/managers';
import { canBlockNodeBePasted, canBlockNodeBeDeleted, canBlockNodeBeCopied, canBlockNodeBeCloned, canBlockNodeBeOrdered } from '@/core/block/node/managers/queries/hierarchy';

/**
 * Retrieves the compatible element keys for the currently selected node, filtered by its parent.
 *
 * This reactive hook computes the element keys that the selected node can use,
 * based on its definition and the parent's acceptance rules.
 *
 * @returns ElementKey[] - An array of compatible element keys
 */
export function useBlockNodeCompatibleElementKeys(sourceNodeID: NodeID): ElementKey[] {
 const selectedParentID = useSelectedBlockNodeParentID();
	if (!selectedParentID) return [];

	return getBlockNodeCompatibleElementKeys(sourceNodeID, selectedParentID);
}

/**
 * Checks if a specific node can be deleted.
 *
 * This hook determines whether the given node can be deleted,
 * based on its element definition. It provides a reactive way to access this information.
 *
 * @param sourceNodeID - The unique identifier of the node to check
 * @returns boolean - True if the node is deletable, false otherwise
 * @see {@link canBlockNodeBeDeleted} - The underlying query function
 */
export function useBlockNodeIsDeletable(sourceNodeID: NodeID): boolean {
	return useNodeStore((state) => {
		const instance = pickNodeInstance(sourceNodeID, state.storedNodes);
		if (!instance.success) return false;

		return canBlockNodeBeDeleted(sourceNodeID);
	});
}

/**
 * Checks if a specific node can be copied.
 *
 * This hook determines whether the given node can be copied,
 * based on its element definition. It provides a reactive way to access this information.
 *
 * @param sourceNodeID - The unique identifier of the node to check
 * @returns boolean - True if the node is copyable, false otherwise
 * @see {@link canBlockNodeBeCopied} - The underlying query function
 */
export function useBlockNodeIsCopyable(sourceNodeID: NodeID): boolean {
	return useNodeStore((state) => {
		const instance = pickNodeInstance(sourceNodeID, state.storedNodes);
		if (!instance.success) return false;

		return canBlockNodeBeCopied(sourceNodeID);
	});
}

/**
 * Checks if a specific node can be cloned.
 *
 * This hook determines whether the given node can be cloned,
 * based on its element definition. It provides a reactive way to access this information.
 *
 * @param sourceNodeID - The unique identifier of the node to check
 * @returns boolean - True if the node is cloneable, false otherwise
 * @see {@link canBlockNodeBeCloned} - The underlying query function
 */
export function useBlockNodeIsCloneable(sourceNodeID: NodeID): boolean {
	return useNodeStore((state) => {
		const instance = pickNodeInstance(sourceNodeID, state.storedNodes);
		if (!instance.success) return false;

		return canBlockNodeBeCloned(sourceNodeID);
	});
}

/**
 * Checks if a specific node can be reordered.
 *
 * This hook determines whether the given node can be reordered,
 * based on its element definition. It provides a reactive way to access this information.
 *
 * @param sourceNodeID - The unique identifier of the node to check
 * @returns boolean - True if the node is orderable, false otherwise
 * @see {@link canBlockNodeBeOrdered} - The underlying query function
 */
export function useBlockNodeIsOrderable(sourceNodeID: NodeID): boolean {
	return useNodeStore((state) => {
		const instance = pickNodeInstance(sourceNodeID, state.storedNodes);
		if (!instance.success) return false;

		return canBlockNodeBeOrdered(sourceNodeID);
	});
}

export function useBlockNodeIsPasteable(sourceNodeID: NodeID): boolean {
	return useNodeStore((state) => {
		const instance = pickNodeInstance(sourceNodeID, state.storedNodes);
		if (!instance.success) return false;

		return canBlockNodeBePasted(sourceNodeID);
	});
}
