// Stores
import { useBlockStore } from '@/src/core/block/store';

// Types
import type { BlockID } from '@/src/core/block/instance/types';
import type { AttributeKey, AttributeValue } from '@/src/core/block/attribute/types';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Helpers
import { validateBlockID } from '@/src/core/block/instance/helper/validate';
import { validateAttributeKey, validateAttributeValue } from '@/src/core/block/attribute/helper';
import { fetchBlock } from '@/src/core/block/instance/helper/fetch';

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
			block: fetchBlock(data.blockID, blockStore.allBlocks),
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
