// Stores
import { useBlockStore } from '@/state/block/block';

// Types
import type { NodeID } from '@/core/block/node/instance/types';
import type { StyleKey } from '@/core/block/style/types';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline';
import { devLog } from '@/shared/utilities/dev';

// Helpers
import { cascadeBlockStyle, updateBlockStyle, validateStyleKey, validateStyleValue, pickNodeStyles, pickStyleDefinition } from '@/core/block/style/helpers';
import { validateNodeID, pickNodeInstance } from '@/core/block/node/instance/helpers';
import { fetchPageContext } from '@/core/layout/page/helpers';

// Registry
import { getRegisteredStyles, getRegisteredTokenTypes, getRegisteredTokens } from '@/core/block/style/registries';

/**
 * Sets a style key value for the current device/orientation/pseudo context in block style operations.
 * Handles CSS shorthand expansion and updates the block's styles.
 *
 * @param NodeID - The block identifier
 * @param styleKey - The CSS style key to set
 * @param value - The value to set
 */
export function setBlockStyle(NodeID: NodeID, styleKey: StyleKey, value: string): void {
	const blockStore = useBlockStore.getState();
	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockManager → setBlockStyle]')
		.validate({
			NodeID: validateNodeID(NodeID),
			styleKey: validateStyleKey(styleKey),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.NodeID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			NodeStyles: pickNodeStyles(data.blockInstance),
		}))
		.pick((data) => ({
			styleDefinition: pickStyleDefinition(data.styleKey, getRegisteredStyles()),
		}))
		.pick(() => ({
			pageContext: fetchPageContext(),
		}))
		.validate((data) => ({
			value: validateStyleValue(data.styleKey, data.styleDefinition, value, getRegisteredTokenTypes(), getRegisteredTokens()),
		}))
		.operate((data) => ({
			updatedStyles: updateBlockStyle(
				data.styleKey, //
				data.value,
				data.styleDefinition,
				data.NodeStyles,
				data.pageContext,
			),
		}))
		.execute();
	if (!results) return;


	// Update the block styles in the store
	blockStore.updateBlocks({
		[NodeID]: {
			...results.blockInstance,
			styles: results.updatedStyles,
		},
	});
}

/**
 * Copies a style key value to clipboard for block style operations.
 * Retrieves the current style value and writes it to the system clipboard.
 *
 * @param NodeID - The block identifier
 * @param styleKey - The CSS style key to copy
 */
export function copyBlockStyle(NodeID: NodeID, styleKey: StyleKey): void {
	const blockStore = useBlockStore.getState();

	// Validate and pick necessary data
	const results = new ResultPipeline('[BlockManager → copyBlockStyle]')
		.validate({
			NodeID: validateNodeID(NodeID),
			styleKey: validateStyleKey(styleKey),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.NodeID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			NodeStyles: pickNodeStyles(data.blockInstance),
			styleDefinition: pickStyleDefinition(data.styleKey, getRegisteredStyles()),
		}))
		.pick(() => ({
			pageContext: fetchPageContext(),
		}))
		.operate((data) => ({
			styleValue: cascadeBlockStyle(data.styleKey, data.NodeStyles, data.styleDefinition, data.pageContext),
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
 * @param NodeID - The block identifier
 * @param styleKey - The CSS style key to paste
 */
export function pasteBlockStyle(NodeID: NodeID, styleKey: StyleKey): void {
	const results = new ResultPipeline('[BlockManager → pasteBlockStyle]')
		.validate({
			NodeID: validateNodeID(NodeID),
			styleKey: validateStyleKey(styleKey),
		})
		.pick((data) => ({
			styleDefinition: pickStyleDefinition(data.styleKey, getRegisteredStyles()),
		}))
		.execute();
	if (!results) return;

	navigator.clipboard
		.readText()
		.then((text) => {
			const safeValue = validateStyleValue(results.styleKey, results.styleDefinition, text, getRegisteredTokenTypes(), getRegisteredTokens());
			if (!safeValue.valid) return devLog.error(`[BlockManager → pasteBlockStyle] ${safeValue.message}`);

			setBlockStyle(results.NodeID, results.styleKey, safeValue.value);
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
 * @param NodeID - The block identifier
 * @param styleKey - The CSS style key to reset
 */
export function resetBlockStyle(NodeID: NodeID, styleKey: StyleKey): void {
	// Validate necessary data
	const results = new ResultPipeline('[BlockManager → resetBlockStyle]')
		.validate({
			NodeID: validateNodeID(NodeID),
			styleKey: validateStyleKey(styleKey),
		})
		.execute();
	if (!results) return;

	// Set the style to empty string
	setBlockStyle(results.NodeID, results.styleKey, '');
}
