// Stores
import { useBlockStore } from '@/state/block/block';

// Types
import type { NodeID } from '@/core/block/node/instance/types';
import type { AttributeKey, AttributeValue } from '@/core/block/attribute/types';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Helpers
import { validateNodeID } from '@/core/block/node/instance/helpers/validators';
import { validateAttributeKey, validateAttributeValue } from '@/core/block/attribute/helpers';
import { pickNodeInstance } from '@/core/block/node/instance/helpers/pickers';

/**
 * Sets the attribute value for a specific block in block attribute operations.
 * Updates the block's attributes with the provided key-value pair after validation.
 *
 * @param NodeID - The block identifier to update
 * @param attributeKey - The attribute key to set
 * @param attributeValue - The new value for the attribute
 */
export function setBlockAttribute(NodeID: NodeID, attributeKey: AttributeKey, attributeValue: AttributeValue): void {
	const blockStore = useBlockStore.getState();

	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockManager → setBlockAttribute]')
		.validate({
			NodeID: validateNodeID(NodeID),
			attributeKey: validateAttributeKey(attributeKey),
			attributeValue: validateAttributeValue(attributeValue),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.NodeID, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// Update the block attributes in the store
	blockStore.updateBlocks({
		[results.NodeID]: {
			...	results.blockInstance,
			attributes: {
				...results.blockInstance.attributes,
				[results.attributeKey]: results.attributeValue,
			},
		},
	});
}


