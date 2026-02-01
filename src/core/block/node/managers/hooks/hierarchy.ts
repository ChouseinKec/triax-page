import { useMemo } from 'react';

// Types
import type { ElementKey } from '@/core/block/element/types';
import type { NodeID } from '@/core/block/node/types/instance';

// Managers
import { getNodeCompatibleElementKeys, useSelectedParentID } from '@/core/block/node/managers';

/**
 * Retrieves the compatible element keys for the currently selected node, filtered by its parent.
 *
 * This reactive hook computes the element keys that the selected node can use,
 * based on its definition and the parent's acceptance rules.
 *
 * @returns ElementKey[] - An array of compatible element keys
 */
export function useNodeCompatibleElementKeys(sourceNodeID: NodeID): ElementKey[] {
	const selectedParentID = useSelectedParentID();

	return useMemo(() => {
		if (!selectedParentID) return [];
		return getNodeCompatibleElementKeys(sourceNodeID, selectedParentID);
	}, [sourceNodeID, selectedParentID]);
}
