// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

// React
import { useMemo } from 'react';

// Types
import type { BlockID } from '@/src/page-builder/core/block/block/types';
import type { AttributeKey, AttributeValue } from '@/src/page-builder/core/block/attribute/types';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Helpers
import { fetchBlock } from '@/src/page-builder/services/helpers/fetch';
import { validateBlockID, validateAttributeKey, validateAttributeValue } from '@/src/page-builder/services/helpers/validate';

/**
 * Sets the attribute value for a specific block in block attribute operations.
 * Updates the block's attributes with the provided key-value pair after validation.
 *
 * @param blockID - The block identifier to update
 * @param attributeKey - The attribute key to set
 * @param attributeValue - The new value for the attribute
 * @returns void
 *
 * @example
 * setBlockAttribute('block-1', 'className', 'my-class')
 */
export function setBlockAttribute(blockID: BlockID, attributeKey: AttributeKey, attributeValue: AttributeValue): void {
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → setBlockAttribute]')
		.validate({
			blockID: validateBlockID(blockID),
			attributeKey: validateAttributeKey(attributeKey),
			attributeValue: validateAttributeValue(attributeValue),
		})
		.fetch((data) => ({
			block: fetchBlock(data.blockID,blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	blockStore.updateBlocks({
		[safeData.blockID]: {
			...safeData.block,
			attributes: {
				...safeData.block.attributes,
				[safeData.attributeKey]: safeData.attributeValue,
			},
		},
	});
}

/**
 * Subscribes to attribute value changes for a specific block in block attribute operations.
 * Returns the current attribute value and updates reactively when it changes.
 *
 * @param blockID - The block identifier to subscribe to
 * @param attributeKey - The attribute key to watch for changes
 * @returns The current attribute value or undefined if not found
 *
 * @example
 * useBlockAttribute('block-1', 'className')
 */
export function useBlockAttribute(blockID: BlockID, attributeKey: AttributeKey): string | undefined {
	const safeData = useMemo(() => new ValidationPipeline('[BlockManager → useBlockAttribute]')
		.validate({
			blockID: validateBlockID(blockID),
			attributeKey: validateAttributeKey(attributeKey),
		})
		.execute(), [blockID, attributeKey]);

	return useBlockStore((state) => {
		if (!safeData) return undefined;
		return state.allBlocks[safeData.blockID]?.attributes?.[safeData.attributeKey];
	});
}
