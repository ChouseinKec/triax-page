// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';
import { devLog } from '@/shared/utilities/dev';

// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { AttributeKey } from '@/core/block/attribute/types';

// Helpers
import { validateNodeID, pickNodeInstance } from '@/core/block/node/helpers';
import { validateAttributeKey } from '@/core/block/attribute/helpers/validators';

// Queries
import { canBlockAttributeBeEdited } from '../queries/attribute';

/**
 * Subscribes to attribute value changes for a specific block in block attribute operations.
 * Returns the current attribute value and updates reactively when it changes.
 *
 * @param nodeID - The block identifier to subscribe to
 * @param attributeKey - The attribute key to watch for changes
 */
export function useBlockAttribute(nodeID: NodeID, attributeKey: AttributeKey): string | undefined {
	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockQueries → useBlockAttribute]')
		.validate({
			nodeID: validateNodeID(nodeID),
			attributeKey: validateAttributeKey(attributeKey),
		})
		.execute();
	if (!results) return undefined;

	// Return a reactive attribute value
	return useNodeStore((state) => {
		// Pick and operate on necessary data
		const blockResult = pickNodeInstance(results.nodeID, state.storedNodes);
		if (!blockResult.success) return devLog.error(`[BlockQueries → useBlockAttribute] Block not found: ${results.nodeID}`), undefined;

		// Return the block attribute data
		return blockResult.data.attributes[results.attributeKey];
	});
}

/**
 * Checks if a specific block's attributes can be edited.
 *
 * This hook determines whether the attributes of the given block are editable,
 * based on its element definition. It provides a reactive way to access this information.
 *
 * @param sourceNodeID - The unique identifier of the block to check
 * @returns boolean - True if the block's attributes are editable, false otherwise
 * @see {@link canBlockAttributeBeEdited} - The underlying query function
 */
export function useBlockAttributeIsEditable(sourceNodeID: NodeID): boolean {
	return useNodeStore((state) => {
		const instance = pickNodeInstance(sourceNodeID, state.storedNodes);
		if (!instance.success) return false;

		return canBlockAttributeBeEdited(sourceNodeID);
	});
}
