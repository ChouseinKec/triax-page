import { useMemo } from 'react';

// Stores
import { useBlockStore } from '@/src/core/block/store';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Types
import type { BlockID } from '@/src/core/block/instance/types';
import type { AttributeKey } from '@/src/core/block/attribute/types';

// Helpers
import { validateBlockID } from '@/src/core/block/instance/helper/validators';
import { validateAttributeKey } from '@/src/core/block/attribute/helper/validators';

/**
 * Subscribes to attribute value changes for a specific block in block attribute operations.
 * Returns the current attribute value and updates reactively when it changes.
 *
 * @param blockID - The block identifier to subscribe to
 * @param attributeKey - The attribute key to watch for changes
 * @returns The current attribute value or undefined if not found
 *
 * @example
 * useBlockAttribute('block-1', 'className') → 'my-class'
 */
export function useBlockAttribute(blockID: BlockID, attributeKey: AttributeKey): string | undefined {
	const safeParams = useMemo(
		() =>
			new ResultPipeline('[BlockQueries → useBlockAttribute]')
				.validate({
					blockID: validateBlockID(blockID),
					attributeKey: validateAttributeKey(attributeKey),
				})
				.execute(),
		[blockID, attributeKey]
	);
	if (!safeParams) return undefined;

	return useBlockStore((state) => {
		const block = state.allBlocks[safeParams.blockID];
		if (!block) return undefined;

		return block.attributes[safeParams.attributeKey];
	});
}
