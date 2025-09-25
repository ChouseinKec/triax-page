// Helpers
import { validateAttributeKey, validateAttributeValue } from '@/src/page-builder/services/helpers/block/attribute';
import { validateBlockInstance } from '@/src/page-builder/services/helpers/block/block';

// Stores
import useBlockStore from '@/src/page-builder/state/stores/block';

// Types
import type { BlockID } from '@/src/page-builder/core/block/block/types';
import type { AttributeKeys } from '@/src/page-builder/core/block/attribute/types';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';

/**
 * Sets attribute value for block.
 * @param blockID Block identifier to update
 * @param attribute Attribute key to set
 * @param value New value for the attribute
 */
export function setBlockAttribute(blockID: BlockID, attribute: AttributeKeys, value: string) {
	const block = useBlockStore.getState().allBlocks[blockID];
	if (!block) return devLog.error(`[attributeManager → setBlockAttribute] Block not found`);

	const blockValidation = validateBlockInstance(block);
	if (!blockValidation.success) return devLog.error(`[attributeManager → setBlockAttribute] ${blockValidation.error}`);

	const attributeValidation = validateAttributeKey(attribute);
	if (!attributeValidation.success) return devLog.error(`[attributeManager → setBlockAttribute] ${attributeValidation.error}`);

	const valueValidation = validateAttributeValue(value);
	if (!valueValidation.success) return devLog.error(`[attributeManager → setBlockAttribute] ${valueValidation.error}`);

	const updatedBlock = {
		...block,
		attributes: {
			...block.attributes,
			[attribute]: value,
		},
	};

	useBlockStore.getState().updateBlock(blockID, updatedBlock);
}

/**
 * Subscribes to attribute value with automatic updates.
 * @param blockID Block identifier to subscribe to
 * @param attribute Attribute key to watch for changes
 * @returns Current attribute value, updates on changes
 */
export function useBlockAttribute(blockID: BlockID, attribute: AttributeKeys): string | undefined {
	const attributeValidation = validateAttributeKey(attribute);

	if (!attributeValidation.success) {
		devLog.error(`[attributeManager → useBlockAttribute] ${attributeValidation.error}`);
		return undefined;
	}

	return useBlockStore((state) => state.allBlocks[blockID]?.attributes?.[attribute]);
}
