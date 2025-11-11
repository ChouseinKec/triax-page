// Stores
import { useBlockStore } from '@/src/page/state/stores/block';

// Types
import type { BlockID, BlockContent } from '@/src/page/core/block/block/types';
import type { ElementTag } from '@/src/page/core/block/element/types';
import type { StyleKey } from '@/src/page/core/block/style/types';
import type { AttributeKey, AttributeValue } from '@/src/page/core/block/attribute/types';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';
import { devLog } from '@/src/shared/utilities/dev';

// Helpers
import { applyStyle } from '@/src/page/service/helpers/block/style';
import { validateBlockTag, validateBlockID, validateStyleKey, validateStyleValue, validateAttributeKey, validateAttributeValue } from '@/src/page/service/helpers/block/validate';
import { fetchBlock } from '@/src/page/service/helpers/block/fetch';
import { validatePseudoID, validateOrientationID, validateDeviceID } from '@/src/page/service/helpers/page/validate';

// Managers
import { getSelectedDeviceID, getSelectedOrientationID, getSelectedPseudoID } from '@/src/page/service/managers/page';

// Helpers
import { getBlockStyle } from './queries';

// -------------------------  PROPERTY -------------------------

/**
 * Sets the HTML tag for a specific block.
 * Updates the block's primary HTML element tag.
 *
 * @param blockID - The block identifier
 * @param tag - The new HTML tag to set
 * @returns void
 *
 * @example
 * setBlockTag('block-123', 'div')
 */
export function setBlockTag(blockID: BlockID, blockTag: ElementTag): void {
	const safeData = new ValidationPipeline('[BlockCommands → setBlockTag]')
		.validate({
			blockID: validateBlockID(blockID),
			blockTag: validateBlockTag(blockTag),
		})
		.execute();
	if (!safeData) return;

	const currentBlock = useBlockStore.getState().allBlocks[blockID];
	if (!currentBlock) return;

	useBlockStore.getState().updateBlocks({ [blockID]: { ...currentBlock, tag: safeData.blockTag } });
}

/**
 * Selects a block as the currently active block for editing in block CRUD operations.
 * Sets the selected block ID in the store.
 *
 * @param blockID - The block identifier to select, or null to clear selection
 * @returns void
 *
 * @example
 * selectBlock('block-123')
 * selectBlock(null)
 */
export function selectBlock(blockID: BlockID | null): void {
	const { selectedBlockID, selectBlock: selectBlockAction } = useBlockStore.getState();

	// If null, clear selection
	if (blockID === null) return selectBlockAction(null);

	// If already selected, do nothing
	if (blockID === selectedBlockID) return;

	const safeData = new ValidationPipeline('[BlockCommands → selectBlock]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.execute();
	if (!safeData) return;

	selectBlockAction(safeData.blockID);
}

// ------------------------- STYLE -------------------------

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

// ------------------------- ATTRIBUTE -------------------------

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
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → setBlockAttribute]')
		.validate({
			blockID: validateBlockID(blockID),
			attributeKey: validateAttributeKey(attributeKey),
			attributeValue: validateAttributeValue(attributeValue),
		})
		.fetch((data) => ({
			block: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return;

	blockStore.updateBlocks({
		[safeData.blockID]: {
			...safeData.block,
			attributes: {
				...safeData.block.attributes,
				[safeData.attributeKey]: safeData.attributeValue,
			},
		},
	});
}

// ------------------------- CONTENT -------------------------

/**
 * Sets the content data for a specific block.
 * Merges the new content with existing content.
 *
 * @param blockID - The block identifier
 * @param content - The content data to set
 * @returns void
 *
 * @example
 * setBlockContent('block-123', { text: 'New text', format: 'bold' })
 */
export function setBlockContent(blockID: BlockID, content: BlockContent): void {
	const safeData = new ValidationPipeline('[BlockCommands → setBlockContent]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.execute();
	if (!safeData) return;

	const currentBlock = useBlockStore.getState().allBlocks[safeData.blockID];
	if (!currentBlock) return;

	useBlockStore.getState().updateBlocks({ [safeData.blockID]: { ...currentBlock, content } });
}
