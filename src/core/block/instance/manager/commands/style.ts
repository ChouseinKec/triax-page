// Stores
import { useBlockStore } from '@/src/core/block/store';

// Types
import type { BlockID } from '@/src/core/block/instance/types';
import type { StyleKey } from '@/src/core/block/style/core/types';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';
import { devLog } from '@/src/shared/utilities/dev';

// Helpers
import { applyStyle, validateStyleKey, validateStyleValue } from '@/src/core/block/style/helper';
import { getBlockStyle } from '@/src/core/block/instance/manager/queries';
import { validateBlockID, fetchBlock } from '@/src/core/block/instance/helper';
import { validatePseudoID, validateOrientationID, validateDeviceID } from '@/src/core/layout/page/helper';

// Managers
import { getSelectedDeviceID, getSelectedOrientationID, getSelectedPseudoID } from '@/src/core/layout/page/manager';



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
