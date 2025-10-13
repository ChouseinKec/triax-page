import { useMemo } from 'react';

// Utilities
import { devLog } from '@/src/shared/utilities/dev';
import { ValidationPipeline } from '@/src/shared/utilities/validation';

// Helpers
import { applyStyle, resolveStyle } from '@/src/page-builder/services/helpers/block';
import { validateBlockID, validateStyleKey, validateStyleValue, validatePseudoID, validateOrientationID, validateDeviceID } from '@/src/page-builder/services/helpers/validate';
import { fetchBlock } from '@/src/page-builder/services/helpers/fetch';

// Managers
import { useSelectedDeviceID, getSelectedDeviceID, useSelectedOrientationID, getSelectedOrientationID, useSelectedPseudoID, getSelectedPseudoID } from '@/src/page-builder/services/managers/page';

// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

// Types
import type { BlockID } from '@/src/page-builder/core/block/block/types';
import type { StyleKey } from '@/src/page-builder/core/block/style/types';

/**
 * Gets a style key value with CSS cascade fallback logic for block style operations.
 * Resolves the style value considering device, orientation, and pseudo contexts.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS style key to lookup
 * @returns The resolved value or undefined if not found
 *
 * @example
 * getBlockStyle('block-123', 'color') → 'red'
 */
export function getBlockStyle(blockID: BlockID, styleKey: StyleKey): string | undefined {
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → getBlockStyle]')
		.validate({
			blockID: validateBlockID(blockID),
			styleKey: validateStyleKey(styleKey),
			deviceID: validateDeviceID(getSelectedDeviceID()),
			orientationID: validateOrientationID(getSelectedOrientationID()),
			pseudoID: validatePseudoID(getSelectedPseudoID()),
		})
		.fetch((data) => ({
			block: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return undefined;

	return resolveStyle(
		safeData.block.styles, //
		safeData.styleKey,
		safeData.deviceID,
		safeData.orientationID,
		safeData.pseudoID
	);
}

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
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → getBlockStyle]')
		.validate({
			blockID: validateBlockID(blockID),
			styleKey: validateStyleKey(styleKey),
			deviceID: validateDeviceID(useSelectedDeviceID()),
			orientationID: validateOrientationID(useSelectedOrientationID()),
			pseudoID: validatePseudoID(useSelectedPseudoID()),
		})
		.fetch((data) => ({
			block: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return undefined;

	return useBlockStore(
		useMemo(
			() => (state) => {
				const styles = state.allBlocks[blockID]?.styles;
				if (!styles) return undefined;

				return resolveStyle(
					styles, //
					styleKey,
					safeData.deviceID,
					safeData.orientationID,
					safeData.pseudoID
				);
			},
			[blockID, styleKey, safeData.deviceID, safeData.orientationID, safeData.pseudoID]
		)
	);
}

/**
 * Sets a style key value for the current device/orientation/pseudo context in block style operations.
 * Handles CSS shorthand expansion and updates the block's styles.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS style key to set
 * @param value - The value to set
 * @returns void
 *
 * @example
 * setBlockStyle('block-123', 'color', 'red')
 */
export function setBlockStyle(blockID: BlockID, styleKey: StyleKey, value: string): void {
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → setBlockStyle]')
		.validate({
			blockID: validateBlockID(blockID),
			styleKey: validateStyleKey(styleKey),
			value: validateStyleValue(styleKey, value),
			deviceID: validateDeviceID(getSelectedDeviceID()),
			orientationID: validateOrientationID(getSelectedOrientationID()),
			pseudoID: validatePseudoID(getSelectedPseudoID()),
		})
		.fetch((data) => ({
			block: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	blockStore.updateBlocks({
		[blockID]: {
			...safeData.block,
			styles: applyStyle(
				styleKey, //
				value,
				safeData.block.styles,
				safeData.deviceID,
				safeData.orientationID,
				safeData.pseudoID
			),
		},
	});
}

/**
 * Copies a style key value to clipboard for block style operations.
 * Retrieves the current style value and writes it to the system clipboard.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS style key to copy
 * @returns void
 *
 * @example
 * copyBlockStyle('block-123', 'color') // Copies 'red' to clipboard
 */
export function copyBlockStyle(blockID: BlockID, styleKey: StyleKey): void {
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → copyBlockStyle]')
		.validate({
			blockID: validateBlockID(blockID),
			styleKey: validateStyleKey(styleKey),
		})
		.fetch((data) => ({
			block: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.derive((data) => ({
			style: getBlockStyle(data.blockID, data.styleKey),
		}))
		.execute();
	if (!safeData) return;
	if (!safeData.style) return devLog.error(`[BlockManager → copyBlockStyle] No style found for ${safeData.styleKey}`);

	// Copy the value to clipboard
	navigator.clipboard
		.writeText(safeData.style)
		.then(() => {
			devLog.info(`Copied style ${safeData.styleKey}: ${safeData.style}`);
		})
		.catch((err) => {
			devLog.error(`Failed to copy style ${safeData.styleKey}:`, err);
		});
}

/**
 * Pastes a style key value from clipboard for block style operations.
 * Reads text from the system clipboard and sets it as the style value if valid.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS style key to paste
 * @returns void
 *
 * @example
 * pasteBlockStyle('block-123', 'color') // Pastes clipboard content as color value
 */
export function pasteBlockStyle(blockID: BlockID, styleKey: StyleKey): void {
	const safeData = new ValidationPipeline('[BlockManager → pasteBlockStyle]')
		.validate({
			blockID: validateBlockID(blockID),
			styleKey: validateStyleKey(styleKey),
		})
		.execute();
	if (!safeData) return;

	navigator.clipboard
		.readText()
		.then((text) => {
			const safeValue = validateStyleValue(safeData.styleKey, text);
			if (!safeValue.valid) return devLog.error(`[BlockManager → pasteBlockStyle] ${safeValue.message}`);

			setBlockStyle(safeData.blockID, safeData.styleKey, safeValue.value);
			devLog.info(`Pasted style ${safeData.styleKey}: ${safeValue.value}`);
		})
		.catch((err) => {
			devLog.error(`Failed to paste style ${safeData.styleKey}:`, err);
		});
}

/**
 * Resets a style key value to empty string for block style operations.
 * Clears the current style value by setting it to an empty string.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS style key to reset
 * @returns void
 *
 * @example
 * resetBlockStyle('block-123', 'color') // Resets color to empty string
 */
export function resetBlockStyle(blockID: BlockID, styleKey: StyleKey): void {
	const safeData = new ValidationPipeline('[BlockManager → resetBlockStyle]')
		.validate({
			blockID: validateBlockID(blockID),
			styleKey: validateStyleKey(styleKey),
		})
		.execute();
	if (!safeData) return;

	setBlockStyle(safeData.blockID, safeData.styleKey, '');
}
