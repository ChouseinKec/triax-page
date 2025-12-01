// Stores
import { useBlockStore } from '@/src/core/block/store';

// Types
import type { BlockID } from '@/src/core/block/instance/types';
import type { AttributeKey, AttributeValue } from '@/src/core/block/attribute/types';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Helpers
import { validateBlockID, pickBlockInstance } from '@/src/core/block/instance/helper';
import { validateAttributeKey, validateAttributeValue } from '@/src/core/block/attribute/helper';

/**
 * Sets the attribute value for a specific block in block attribute operations.
 * Updates the block's attributes with the provided key-value pair after validation.
 *
 * @param blockID - The block identifier to update
 * @param attributeKey - The attribute key to set
 * @param attributeValue - The new value for the attribute
 */
export function setBlockAttribute(blockID: BlockID, attributeKey: AttributeKey, attributeValue: AttributeValue): void {
	const blockStore = useBlockStore.getState();

	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockManager → setBlockAttribute]')
		.validate({
			blockID: validateBlockID(blockID),
			attributeKey: validateAttributeKey(attributeKey),
			attributeValue: validateAttributeValue(attributeValue),
		})
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// Update the block attributes in the store
	blockStore.updateBlocks({
		[results.blockID]: {
			...	results.blockInstance,
			attributes: {
				...results.blockInstance.attributes,
				[results.attributeKey]: results.attributeValue,
			},
		},
	});
}
