import { useMemo } from 'react';

// Stores
import { useBlockStore } from '@/src/page/state/stores/block';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Types
import type { BlockID, BlockInstance, BlockType, BlockContent } from '@/src/page/core/block/block/types';
import type { StyleKey } from '@/src/page/core/block/style/types';
import type { AttributeKey } from '@/src/page/core/block/attribute/types';

// Hooks
import { useSelectedDeviceID, useSelectedOrientationID, useSelectedPseudoID } from '@/src/page/service/managers/page';

// Helpers
import { resolveStyle } from '@/src/page/service/helpers/block/style';
import { validateStyleKey, validateAttributeKey, validateBlockID } from '@/src/page/service/helpers/block/validate';
import { validateDeviceID, validateOrientationID, validatePseudoID } from '@/src/page/service/helpers/page/validate';

// ------------------------- INSTANCE -------------------------

/**
 * Reactive hook to get a complete block instance in block queries.
 * Returns the block data and updates reactively when it changes.
 *
 * @param blockID - The block identifier to retrieve
 * @returns The complete block instance or undefined if not found
 *
 * @example
 * useBlock('block-123') → { id: 'block-123', type: 'text', ... }
 */
export function useBlock(blockID: BlockID): BlockInstance | undefined {
	const safeParam = useMemo(
		() =>
			new ValidationPipeline('[BlockQueries → useBlock]')
				.validate({
					blockID: validateBlockID(blockID),
				})
				.execute(),
		[blockID]
	);
	if (!safeParam) return undefined;

	const blockInstance = useBlockStore((state) => state.allBlocks[safeParam.blockID]);
	if (!blockInstance) return undefined;

	return blockInstance;
}

// ------------------------- SELECTION -------------------------

/**
 * Reactive hook to check if a specific block is currently selected.
 * @param blockID - The block identifier to check
 * @returns True if the block is selected, false otherwise
 * @example
 * const isSelected = useIsBlockSelected('block-123'); // true/false
 */
export function useIsBlockSelected(blockID: BlockID): boolean {
	const safeParam = useMemo(
		() =>
			new ValidationPipeline('[BlockQueries → useIsBlockSelected]')
				.validate({
					blockID: validateBlockID(blockID),
				})
				.execute(),
		[blockID]
	);
	if (!safeParam) return false;

	return useBlockStore((state) => state.selectedBlockID === safeParam.blockID);
}

/**
 * Reactive hook to get the type of the currently selected block.
 * @returns The selected block type or undefined if no block is selected
 * @example
 * const selectedType = useSelectedBlockType(); // 'text' | undefined
 */
export function useSelectedBlockType(): BlockType | null {
	return useBlockStore((state) => {
		const selectedBlockID = state.selectedBlockID;
		if (!selectedBlockID) return null;

		const selectedBlock = state.allBlocks[selectedBlockID];
		if (!selectedBlock) return null;

		return selectedBlock.type;
	});
}

/**
 * Reactive hook to get the ID of the currently selected block.
 * @returns The selected block ID or undefined if no block is selected
 * @example
 * const selectedID = useSelectedBlockID(); // 'block-123' | undefined
 */
export function useSelectedBlockID(): BlockID | null {
	return useBlockStore((state) => state.selectedBlockID);
}

// ------------------------- STYLE -------------------------

/**
 * Reactive hook to get a block's style value with CSS cascade fallback logic for block style operations.
 * Returns the resolved style value considering device, orientation, and pseudo contexts.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS style key to retrieve
 * @returns The resolved style value or undefined if not found
 *
 * @example
 * const color = useBlockStyle('block-123', 'color') // Returns 'red' or undefined
 */
export function useBlockStyle(blockID: BlockID, styleKey: StyleKey): string | undefined {
	const deviceID = useSelectedDeviceID();
	const orientationID = useSelectedOrientationID();
	const pseudoID = useSelectedPseudoID();
	const safeParams = useMemo(
		() =>
			new ValidationPipeline('[BlockQueries → useBlockStyle]')
				.validate({
					blockID: validateBlockID(blockID),
					styleKey: validateStyleKey(styleKey),
					deviceID: validateDeviceID(deviceID),
					orientationID: validateOrientationID(orientationID),
					pseudoID: validatePseudoID(pseudoID),
				})
				.execute(),
		[blockID, styleKey, deviceID, orientationID, pseudoID]
	);
	if (!safeParams) return undefined;

	return useBlockStore((state) => {
		const block = state.allBlocks[safeParams.blockID];
		if (!block) return undefined;

		return resolveStyle(
			block.styles, //
			safeParams.styleKey,
			safeParams.deviceID,
			safeParams.orientationID,
			safeParams.pseudoID
		);
	});
}

// ------------------------- ATTRIBUTE -------------------------

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
			new ValidationPipeline('[BlockQueries → useBlockAttribute]')
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

// ------------------------- CONTENT -------------------------

/**
 * React hook to get the content data for a specific block.
 * Returns the block's content object or undefined if not found.
 *
 * @param blockID - The block identifier
 * @returns The block's content data or undefined
 *
 * @example
 * const content = useBlockContent('block-123') // Returns { text: 'Hello World' }
 */
export function useBlockContent(blockID: BlockID): BlockContent | undefined {
	const safeParam = useMemo(
		() =>
			new ValidationPipeline('[BlockQueries → useBlockContent]')
				.validate({
					blockID: validateBlockID(blockID),
				})
				.execute(),
		[blockID]
	);
	if (!safeParam) return undefined;

	return useBlockStore((state) => {
		const block = state.allBlocks[safeParam.blockID];
		if (!block) return undefined;

		return block.content;
	});
}
