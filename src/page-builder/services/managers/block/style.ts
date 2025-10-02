// Utilities
import { cascadeStyle } from '@/src/page-builder/core/block/style/utilities';
import { resolveShorthand } from '@/src/page-builder/core/block/style/utilities';
import { useMemo } from 'react';

import { devLog } from '@/src/shared/utilities/dev';
import { validateOrLog } from '@/src/shared/utilities/validation';

// Helpers
import { validateStyleKey, validateStyleValue, hasShorthand, getShorthand } from '@/src/page-builder/services/helpers/block/style';
import { validateBlockID } from '@/src/page-builder/services/helpers/block';
import { validatePseudoID } from '@/src/page-builder/services/helpers/page/pseudo';
import { validateOrientationID } from '@/src/page-builder/services/helpers/page/orientation';
import { validateDeviceID } from '@/src/page-builder/services/helpers/page/device';

// Managers
import { useSelectedDeviceID, getSelectedDeviceID, getDeviceDefaultID, useSelectedOrientationID, getSelectedOrientationID, getOrientationDefaultID, useSelectedPseudoID, getSelectedPseudoID, getPseudoDefaultID } from '@/src/page-builder/services/managers/page';

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
	const safeParams = validateOrLog(
		{
			blockID: validateBlockID(blockID),
			styleKey: validateStyleKey(styleKey),
			deviceID: validateDeviceID(getSelectedDeviceID()),
			orientationID: validateOrientationID(getSelectedOrientationID()),
			pseudoID: validatePseudoID(getSelectedPseudoID()),
		},
		`[BlockManager → getBlockStyle]`
	);

	if (!safeParams) return undefined;

	const block = useBlockStore.getState().getBlock(safeParams.blockID);
	if (!block) return devLog.error(`[BlockManager → getBlockStyle] Block not found`, undefined);

	const defaultPseudo = getPseudoDefaultID();
	const defaultOrientation = getOrientationDefaultID();
	const defaultDevice = getDeviceDefaultID();

	if (hasShorthand(styleKey)) {
		const properties = getShorthand(styleKey);
		const values = properties.map((property) => {
			return cascadeStyle(block.styles, property, safeParams.deviceID, safeParams.orientationID, safeParams.pseudoID, defaultDevice, defaultOrientation, defaultPseudo);
		});

		return resolveShorthand(values);
	}

	return cascadeStyle(block.styles, styleKey, safeParams.deviceID, safeParams.orientationID, safeParams.pseudoID, defaultDevice, defaultOrientation, defaultPseudo);
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
	const safeParams = validateOrLog(
		{
			blockID: validateBlockID(blockID),
			styleKey: validateStyleKey(styleKey),
			value: validateStyleValue(styleKey, value),
			deviceID: validateDeviceID(getSelectedDeviceID()),
			orientationID: validateOrientationID(getSelectedOrientationID()),
			pseudoID: validatePseudoID(getSelectedPseudoID()),
		},
		`[BlockManager → setBlockStyle]`
	);
	if (!safeParams) return;

	const block = useBlockStore.getState().getBlock(safeParams.blockID);
	if (!block) return devLog.error(`[BlockManager → setBlockStyle] Block not found`, undefined);

	// If the styleKey is a CSS shorthand (e.g. 'margin', 'padding'), set all its longhand properties
	if (hasShorthand(styleKey)) {
		const longhands = getShorthand(styleKey);
		longhands.forEach((longhand) => {
			const shorthandBlock = {
				...block,
				styles: {
					...block.styles,
					[safeParams.deviceID]: {
						...block.styles?.[safeParams.deviceID],
						[safeParams.orientationID]: {
							...block.styles?.[safeParams.deviceID]?.[safeParams.orientationID],
							[safeParams.pseudoID]: {
								...block.styles?.[safeParams.deviceID]?.[safeParams.orientationID]?.[safeParams.pseudoID],
								[longhand]: value,
							},
						},
					},
				},
			};
			useBlockStore.getState().updateBlock(blockID, shorthandBlock);
		});
	}
	// Otherwise, set the single styleKey directly
	else {
		const updatedBlock = {
			...block,
			styles: {
				...block.styles,
				[safeParams.deviceID]: {
					...block.styles?.[safeParams.deviceID],
					[safeParams.orientationID]: {
						...block.styles?.[safeParams.deviceID]?.[safeParams.orientationID],
						[safeParams.pseudoID]: {
							...block.styles?.[safeParams.deviceID]?.[safeParams.orientationID]?.[safeParams.pseudoID],
							[styleKey]: value,
						},
					},
				},
			},
		};

		useBlockStore.getState().updateBlock(blockID, updatedBlock);
	}
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
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID), styleKey: validateStyleKey(styleKey) }, `[BlockManager → copyBlockStyle]`);
	if (!safeParams) return;

	const style = getBlockStyle(safeParams.blockID, safeParams.styleKey);
	if (!style) return devLog.error(`[BlockManager → copyBlockStyle] No style found for ${safeParams.styleKey}`, undefined);

	// Copy the value to clipboard
	navigator.clipboard
		.writeText(style)
		.then(() => {
			devLog.info(`Copied style ${safeParams.styleKey}: ${style}`);
		})
		.catch((err) => {
			devLog.error(`Failed to copy style ${safeParams.styleKey}:`, err);
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
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID), styleKey: validateStyleKey(styleKey) }, `[BlockManager → pasteBlockStyle]`);
	if (!safeParams) return;

	navigator.clipboard
		.readText()
		.then((text) => {
			const safeValue = validateStyleValue(safeParams.styleKey, text);
			if (!safeValue.valid) return devLog.error(`[BlockManager → pasteBlockStyle] ${safeValue.message}`);

			setBlockStyle(safeParams.blockID, safeParams.styleKey, safeValue.value);
			devLog.info(`Pasted style ${safeParams.styleKey}: ${safeValue.value}`);
		})
		.catch((err) => {
			devLog.error(`Failed to paste style ${safeParams.styleKey}:`, err);
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
	const safeParams = validateOrLog({ blockID: validateBlockID(blockID), styleKey: validateStyleKey(styleKey) }, `[BlockManager → resetBlockStyle]`);
	if (!safeParams) return;

	setBlockStyle(safeParams.blockID, safeParams.styleKey, '');
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
	const safeParams = validateOrLog(
		{
			blockID: validateBlockID(blockID),
			styleKey: validateStyleKey(styleKey),
			deviceID: validateDeviceID(useSelectedDeviceID()),
			orientationID: validateOrientationID(useSelectedOrientationID()),
			pseudoID: validatePseudoID(useSelectedPseudoID()),
		},
		`[BlockManager → useBlockStyle]`
	);
	if (!safeParams) return '';

	const defaultPseudo = getPseudoDefaultID();
	const defaultOrientation = getOrientationDefaultID();
	const defaultDevice = getDeviceDefaultID();

	return useBlockStore(
		useMemo(
			() => (state) => {
				const styles = state.allBlocks[blockID]?.styles;
				if (!styles) return undefined;

				if (hasShorthand(styleKey)) {
					const properties = getShorthand(styleKey);
					const values = properties.map((property) => {
						return cascadeStyle(styles, property, safeParams.deviceID, safeParams.orientationID, safeParams.pseudoID, defaultDevice, defaultOrientation, defaultPseudo);
					});
					return resolveShorthand(values);
				}

				return cascadeStyle(styles, styleKey, safeParams.deviceID, safeParams.orientationID, safeParams.pseudoID, defaultDevice, defaultOrientation, defaultPseudo);
			},
			[blockID, styleKey, safeParams.deviceID, safeParams.orientationID, safeParams.pseudoID, defaultDevice, defaultOrientation, defaultPseudo]
		)
	);
}
