// Helpers
import { validateAttributeKey, validateAttributeValue } from '@/src/page-builder/services/helpers/block/attribute';
import { validateBlockID } from '@/src/page-builder/services/helpers/block/block';
// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

// Types
import type { BlockID } from '@/src/page-builder/core/block/block/types';
import type { AttributeKey, AttributeValue } from '@/src/page-builder/core/block/attribute/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';
import { validateOrLog } from '@/src/shared/utilities/validation';

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
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID), attributeKey: validateAttributeKey(attributeKey), attributeValue: validateAttributeValue(attributeValue) }, `[BlockManager → setBlockAttribute]`);
	if (!safeParams) return;

	const block = useBlockStore.getState().getBlock(safeParams.blockID);
	if (!block) return devLog.error(`[BlockManager → setBlockAttribute] Block not found`, undefined);

	const updatedBlock = {
		...block,
		attributes: {
			...block.attributes,
			[safeParams.attributeKey]: safeParams.attributeValue,
		},
	};

	useBlockStore.getState().updateBlock(safeParams.blockID, updatedBlock);
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
 * useBlockAttribute('block-1', 'className') → 'my-class'
 */
export function useBlockAttribute(blockID: BlockID, attributeKey: AttributeKey): string | undefined {
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID), attributeKey: validateAttributeKey(attributeKey) }, `[BlockManager → useBlockAttribute]`);
	if (!safeParams) return;

	return useBlockStore((state) => state.allBlocks[safeParams.blockID]?.attributes?.[safeParams.attributeKey]);
}
