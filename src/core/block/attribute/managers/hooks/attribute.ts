// Stores
import { useBlockStore } from '@/state/block/block';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';
import { devLog } from '@/shared/utilities/dev';

// Types
import type { BlockID } from '@/core/block/instance/types';
import type { AttributeKey } from '@/core/block/attribute/types';

// Helpers
import { validateBlockID, pickBlockInstance } from '@/core/block/instance/helpers';
import { validateAttributeKey } from '@/core/block/attribute/helpers/validators';

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
