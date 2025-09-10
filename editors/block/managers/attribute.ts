// Helpers
import { validateAttributeKey, validateAttributeValue } from '@/editors/block/helpers/attribute';
import { validateBlock } from '@/editors/block/helpers/block';

// Stores
import useBlockStore from '@/editors/block/stores/block/store';

// Types
import type { AttributeKeys, BlockID } from '@/editors/block/types';

/**
 * Gets attribute value from block.
 * @param blockID Block identifier to get attribute from
 * @param attribute Attribute key to retrieve
 * @returns Attribute value or undefined if not found
 */
export const getAttribute = (blockID: BlockID, attribute: AttributeKeys): string | undefined => {
	const store = useBlockStore.getState();
	const block = store.allBlocks[blockID];

	if (!validateBlock(block, 'getAttribute')) return undefined;
	if (!validateAttributeKey(attribute, 'getAttribute')) return undefined;

	return block.attributes[attribute];
};

/**
 * Sets attribute value for block.
 * @param blockID Block identifier to update
 * @param attribute Attribute key to set
 * @param value New value for the attribute
 */
export const setAttribute = (blockID: BlockID, attribute: AttributeKeys, value: string) => {
	const store = useBlockStore.getState();
	const block = store.allBlocks[blockID];

	if (!validateBlock(block, 'setAttribute')) return;
	if (!validateAttributeKey(attribute, 'setAttribute')) return;
	if (!validateAttributeValue(value, 'setAttribute')) return;

	const updatedBlock = {
		...block,
		attributes: {
			...block.attributes,
			[attribute]: value,
		},
	};

	store.updateBlock(blockID, updatedBlock);
};

/**
 * Gets all attributes from block.
 * @param blockID Block identifier to get attributes from
 * @returns Complete attributes object or undefined if block invalid
 */
export const getAttributes = (blockID: BlockID): Partial<Record<AttributeKeys, string>> | undefined => {
	const store = useBlockStore.getState();
	const block = store.allBlocks[blockID];
	if (!validateBlock(block, 'getAttributes')) return undefined;

	return block.attributes;
};

/**
 * Subscribes to attribute value with automatic updates.
 * @param blockID Block identifier to subscribe to
 * @param attribute Attribute key to watch for changes
 * @returns Current attribute value, updates on changes
 */
export const useAttribute = (blockID: BlockID, attribute: AttributeKeys): string | undefined => {
	if (!validateAttributeKey(attribute, 'useAttribute')) return undefined;

	return useBlockStore((state) => {
		const block = state.allBlocks[blockID];
		if (!validateBlock(block, 'useAttribute')) return undefined;
		return block.attributes[attribute];
	});
};

/**
 * Subscribes to all attributes with automatic updates.
 * @param blockID Block identifier to subscribe to
 * @returns Complete attributes object, updates on any change
 */
export const useAttributes = (blockID: BlockID): Partial<Record<AttributeKeys, string>> | undefined => {
	return useBlockStore((state) => {
		const block = state.allBlocks[blockID];
		if (!validateBlock(block, 'useAttributes')) return undefined;
		return block.attributes;
	});
};
