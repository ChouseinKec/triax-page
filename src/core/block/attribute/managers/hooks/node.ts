// Stores
import { useBlockStore } from '@/state/block/block';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';
import { devLog } from '@/shared/utilities/dev';

// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { AttributeKey } from '@/core/block/attribute/types';

// Helpers
import { validateNodeID, pickNodeInstance } from '@/core/block/node/helpers';
import { validateAttributeKey } from '@/core/block/attribute/helpers/validators';

/**
 * Subscribes to attribute value changes for a specific block in block attribute operations.
 * Returns the current attribute value and updates reactively when it changes.
 *
 * @param nodeID - The block identifier to subscribe to
 * @param attributeKey - The attribute key to watch for changes
 */
export function useNodeAttribute(nodeID: NodeID, attributeKey: AttributeKey): string | undefined {
	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockQueries → useNodeAttribute]')
		.validate({
			nodeID: validateNodeID(nodeID),
			attributeKey: validateAttributeKey(attributeKey),
		})
		.execute();
	if (!results) return undefined;

	// Return a reactive attribute value
	return useBlockStore((state) => {
		// Pick and operate on necessary data
		const blockResult = pickNodeInstance(results.nodeID, state.allBlocks);
		if (!blockResult.success) return devLog.error(`[BlockQueries → useNodeAttribute] Block not found: ${results.nodeID}`), undefined;

		// Return the block attribute data
		return blockResult.data.attributes[results.attributeKey];
	});
}
