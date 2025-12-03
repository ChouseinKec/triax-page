// Stores
import { useBlockStore } from '@/src/state/block/block';

// Types
import type { BlockID } from '@/src/core/block/instance/types';
import type { StyleKey } from '@/src/core/block/style/types';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline';
import { devLog } from '@/src/shared/utilities/dev';

// Helpers
import { cascadeBlockStyle, updateBlockStyle, validateStyleKey, validateStyleValue, pickBlockStyles, fetchStyleContext } from '@/src/core/block/style/helper';
import { validateBlockID, pickBlockInstance } from '@/src/core/block/instance/helper';
import { fetchPageContext } from '@/src/core/layout/page/helper';

/**
 * Sets a style key value for the current device/orientation/pseudo context in block style operations.
 * Handles CSS shorthand expansion and updates the block's styles.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS style key to set
 * @param value - The value to set
 */
export function setBlockStyle(blockID: BlockID, styleKey: StyleKey, value: string): void {
	const blockStore = useBlockStore.getState();

	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockManager → setBlockStyle]')
		.validate({
			blockID: validateBlockID(blockID),
			styleKey: validateStyleKey(styleKey),
			value: validateStyleValue(styleKey, value),
		})
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			blockStyles: pickBlockStyles(data.blockInstance),
		}))
		.pick(() => ({
			styleContext: fetchStyleContext(),
			pageContext: fetchPageContext(),
		}))
		.operate((data) => ({
			updatedStyles: updateBlockStyle(
				data.styleKey, //
				data.value,
				data.blockStyles,
				data.styleContext,
				data.pageContext
			),
		}))
		.execute();
	if (!results) return;

	// Update the block styles in the store
	blockStore.updateBlocks({
		[blockID]: {
			...results.blockInstance,
			styles: results.updatedStyles,
		},
	});
}

/**
 * Copies a style key value to clipboard for block style operations.
 * Retrieves the current style value and writes it to the system clipboard.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS style key to copy
 */
export function copyBlockStyle(blockID: BlockID, styleKey: StyleKey): void {
	const blockStore = useBlockStore.getState();

	// Validate and pick necessary data
	const results = new ResultPipeline('[BlockManager → copyBlockStyle]')
		.validate({
			blockID: validateBlockID(blockID),
			styleKey: validateStyleKey(styleKey),
		})
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			blockStyles: pickBlockStyles(data.blockInstance),
		}))
		.pick(() => ({
			styleContext: fetchStyleContext(),
			pageContext: fetchPageContext(),
		}))
		.operate((data) => ({
			styleValue: cascadeBlockStyle(data.styleKey, data.blockStyles, data.styleContext, data.pageContext),
		}))
		.execute();
	if (!results) return;

	// Copy the value to clipboard
	navigator.clipboard
		.writeText(results.styleValue)
		.then(() => {
			devLog.info(`Copied style ${results.styleKey}: ${results.styleValue}`);
		})
		.catch((err) => {
			devLog.error(`Failed to copy style ${results.styleKey}:`, err);
		});
}

/**
 * Pastes a style key value from clipboard for block style operations.
 * Reads text from the system clipboard and sets it as the style value if valid.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS style key to paste
 */
export function pasteBlockStyle(blockID: BlockID, styleKey: StyleKey): void {
	const results = new ResultPipeline('[BlockManager → pasteBlockStyle]')
		.validate({
			blockID: validateBlockID(blockID),
			styleKey: validateStyleKey(styleKey),
		})
		.execute();
	if (!results) return;

	navigator.clipboard
		.readText()
		.then((text) => {
			const safeValue = validateStyleValue(results.styleKey, text);
			if (!safeValue.valid) return devLog.error(`[BlockManager → pasteBlockStyle] ${safeValue.message}`);

			setBlockStyle(results.blockID, results.styleKey, safeValue.value);
			devLog.info(`Pasted style ${results.styleKey}: ${safeValue.value}`);
		})
		.catch((err) => {
			devLog.error(`Failed to paste style ${results.styleKey}:`, err);
		});
}

/**
 * Resets a style key value to empty string for block style operations.
 * Clears the current style value by setting it to an empty string.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS style key to reset
 */
export function resetBlockStyle(blockID: BlockID, styleKey: StyleKey): void {
	// Validate necessary data
	const results = new ResultPipeline('[BlockManager → resetBlockStyle]')
		.validate({
			blockID: validateBlockID(blockID),
			styleKey: validateStyleKey(styleKey),
		})
		.execute();
	if (!results) return;

	// Set the style to empty string
	setBlockStyle(results.blockID, results.styleKey, '');
}
