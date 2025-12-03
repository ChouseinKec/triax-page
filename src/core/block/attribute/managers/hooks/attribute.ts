// Stores
import { useBlockStore } from '@/src/state/block/block';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';
import { devLog } from '@/src/shared/utilities/dev';

// Types
import type { BlockID } from '@/src/core/block/instance/types';
import type { AttributeKey } from '@/src/core/block/attribute/types';

// Helpers
import { validateBlockID, pickBlockInstance } from '@/src/core/block/instance/helpers';
import { validateAttributeKey } from '@/src/core/block/attribute/helpers/validators';

/**
 * Subscribes to attribute value changes for a specific block in block attribute operations.
 * Returns the current attribute value and updates reactively when it changes.
 *
 * @param blockID - The block identifier to subscribe to
 * @param attributeKey - The attribute key to watch for changes
 */
export function useBlockAttribute(blockID: BlockID, attributeKey: AttributeKey): string | undefined {
	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockQueries → useBlockAttribute]')
		.validate({
			blockID: validateBlockID(blockID),
			attributeKey: validateAttributeKey(attributeKey),
		})
		.execute();
	if (!results) return undefined;

	// Return a reactive attribute value
	return useBlockStore((state) => {
		// Pick and operate on necessary data
		const blockResult = pickBlockInstance(results.blockID, state.allBlocks);
		if (!blockResult.success) return devLog.error(`[BlockQueries → useBlockAttribute] Block not found: ${results.blockID}`), undefined;

		// Return the block attribute data
		return blockResult.data.attributes[results.attributeKey];
	});
}
