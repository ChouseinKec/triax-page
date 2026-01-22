// Types
import type { NodeAttributes } from '@/core/block/node/definition/types';
import type { NodeID, StoredNodes } from '@/core/block/node/instance/types';
import type { PickResult } from '@/shared/types/result';

// Helper
import { pickNodeInstance } from '@/core/block/node/instance/helpers/pickers/instance';

/**
 * Fetch the attributes object for a block instance by id.
 *
 * @param NodeID - id of the block whose attributes should be fetched
 * @param storedNodes - record containing all block instances keyed by id
 */
export function pickNodeAttributes(NodeID: NodeID, storedNodes: StoredNodes): PickResult<NodeAttributes> {
	// Resolve block instance
	const blockResult = pickNodeInstance(NodeID, storedNodes);
	if (!blockResult.success) return blockResult;

	// Return attributes if present — otherwise return a helpful error
	const NodeAttributes = blockResult.data.attributes;
	if (!NodeAttributes) return { success: false, error: `Block attributes not found for block: '${NodeID}'` };

	return { success: true, data: NodeAttributes };
}
