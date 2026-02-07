// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';
import { devLog } from '@/shared/utilities/dev';

// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { AttributeKey, AttributeValue } from '@/core/block/attribute/types';

// Helpers
import { validateNodeID, pickNodeInstance } from '@/core/block/node/helpers';
import { validateAttributeKey } from '@/core/block/attribute/helpers/validators';

// Queries
import { canBlockAttributesBeEdited, getBlockAttributesAllowed } from '../queries/attribute';

/**
 * Subscribes to attribute value changes for a specific block in block attribute operations.
 * Returns the current attribute value and updates reactively when it changes.
 *
 * @param nodeID - The block identifier to subscribe to
 * @param attributeKey - The attribute key to watch for changes
 */
export function useBlockAttribute(sourceNodeID: NodeID, attributeKey: AttributeKey): AttributeValue | undefined {
	// Validate, pick, and operate on necessary data
	const validData = new ResultPipeline('[BlockQueries → useBlockAttribute]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
			attributeKey: validateAttributeKey(attributeKey),
		})
		.execute();
	if (!validData) return undefined;

	// Return a reactive attribute value
	return useNodeStore((state) => {
		// Pick and operate on necessary data
		const blockResult = pickNodeInstance(validData.sourceNodeID, state.storedNodes);
		if (!blockResult.success) return undefined;

		// Return the block attribute data
		return blockResult.data.attributes[validData.attributeKey];
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
 * @see {@link canBlockAttributesBeEdited} - The underlying query function
 */
export function useBlockAttributeIsEditable(sourceNodeID: NodeID): boolean {
	return useNodeStore((state) => {
		const instance = pickNodeInstance(sourceNodeID, state.storedNodes);
		if (!instance.success) return false;

		return canBlockAttributesBeEdited(sourceNodeID);
	});
}

/**
 * Retrieves the allowed attributes for a specific block.
 *
 * This hook returns the list of attributes that are permitted for the block's element
 * according to its definition. It provides a reactive way to access this information.
 *
 * @param sourceNodeID - The unique identifier of the block to get allowed attributes for
 * @returns Array of allowed attribute keys
 * @see {@link getBlockAttributesAllowed} - The underlying query function
 */
export function useBlockAttributesAllowed(sourceNodeID: NodeID): AttributeKey[] | undefined {
	// Validate, pick, and operate on necessary data
	const validData = new ResultPipeline('[BlockQueries → useBlockAttribute]')
		.validate({
			nodeID: validateNodeID(sourceNodeID),
		})
		.execute();
	if (!validData) return undefined;

	return useNodeStore((state) => {
		// Pick and operate on necessary data
		const blockResult = pickNodeInstance(validData.nodeID, state.storedNodes);
		if (!blockResult.success) return undefined;

		// Return the block attribute data
		return getBlockAttributesAllowed(sourceNodeID);
	});
}
