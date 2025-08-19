import { useCallback } from 'react';

// Constants
import { HTMLPropertyKey } from '@/types/block/attribute/property';

// Utilities
import { devLog } from '@/utilities/dev';

// Stores
import useBlockStore from '@/stores/block/store';

interface StyleManager {
	getAttribute: (property: HTMLPropertyKey) => string;
	setAttribute: (property: HTMLPropertyKey, value: string) => void;
}

export const useAttributeManager = (): StyleManager => {
	const setBlockAttribute = useBlockStore((state) => state.setBlockAttribute);
	const selectedBlockID = useBlockStore((state) => state.selectedBlockID);
	const blockAttributes = useBlockStore((state) => (selectedBlockID ? state.allBlocks[selectedBlockID]?.attributes : undefined));

	/**
	 * Get the value of a block attribute.
	 * @param property - The attribute key to retrieve the value for.
	 * @returns The value of the block attribute, or an empty string if not found.
	 */
	const getAttribute = useCallback((property: HTMLPropertyKey): string => {
			if (!property) {
				devLog.error('[AttributeManager] getAttribute called with invalid property');
				return '';
			}

			if (!blockAttributes) return '';
			return blockAttributes[property] ?? '';
		},
		[blockAttributes]
	);

	/**
	 * Set the value of a block attribute.
	 * @param property - The attribute key to set the value for.
	 * @param value - The value to set for the block attribute.
	 */
	const setAttribute = useCallback(
		(property: HTMLPropertyKey, value: string): void => {
			if (!property) return devLog.error('[AttributeManager] setAttribute called with invalid property');
			if (!selectedBlockID) return devLog.error('[AttributeManager] setAttribute called without selected block');

			if (typeof value === 'string' && value.trim().length === 0) return;
			setBlockAttribute(selectedBlockID, property, value);
		},
		[setBlockAttribute, selectedBlockID]
	);

	// Return the style manager methods
	return {
		getAttribute,
		setAttribute,
	};
};
