// Constants
import { StyleKeys } from '@/editors/block/types/core/style/style';
import { StyleShorthandDefinitions } from '@/constants/style/style';

// Utilities
import { cascadeStyle } from '@/editors/block/utilities/style/cascade';
import { devLog } from '@/utilities/dev';

// Stores
import usePageStore from '@/stores/page/store';
import useBlockStore from '@/editors/block/stores/block/store';

// Helpers
import { validateStyleKey, validateStyleValue } from '@/editors/block/helpers/style';
import { validateBlock } from '@/editors/block/helpers/block';

// Types
import type { BlockID } from '@/editors/block/types';

/**
 * Gets a style styleKey value with CSS cascade fallback logic.
 * Validates block and styleKey before lookup.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS styleKey to lookup
 * @returns The resolved value or empty string if not found
 */
export const getStyle = (blockID: BlockID, styleKey: StyleKeys): string => {
	if (!validateStyleKey(styleKey, 'StyleManager → getStyle')) return '';

	const allBlocks = useBlockStore.getState().allBlocks;
	if (!validateBlock(allBlocks[blockID], 'StyleManager → getStyle')) return '';

	const device = usePageStore.getState().currentDevice.value;
	const devices = usePageStore.getState().allDevices;
	const orientation = usePageStore.getState().currentOrientation.value;
	const orientations = usePageStore.getState().allOrientations;
	const pseudos = usePageStore.getState().allPseudos;
	const pseudo = usePageStore.getState().currentPseudo.value;

	const defaultPseudo = pseudos[0].value;
	const defaultOrientation = orientations[0].value;
	const defaultDevice = devices[0].value;

	const StylesEditor = allBlocks[blockID].styles;
	if (!StylesEditor) return '';

	if (StyleShorthandDefinitions[styleKey]) {
		const values = StyleShorthandDefinitions[styleKey].map((longhand) => {
			return cascadeStyle(StylesEditor, longhand as StyleKeys, device, orientation, pseudo, defaultDevice, defaultOrientation, defaultPseudo);
		});

		const uniqueValues = Array.from(new Set(values.filter(Boolean)));
		if (uniqueValues.length === 1) {
			return uniqueValues[0]; // All sides are the same
		} else if (uniqueValues.length === 0) {
			return ''; // All sides are empty
		} else {
			return values[0]; // Sides have different values
		}
	}

	return cascadeStyle(StylesEditor, styleKey, device, orientation, pseudo, defaultDevice, defaultOrientation, defaultPseudo);
};

/**
 * Sets a style styleKey value for the current device/orientation/pseudo context.
 * Handles CSS shorthand expansion and validates input.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS styleKey to set
 * @param value - The value to set
 */
export const setStyle = (blockID: BlockID, styleKey: StyleKeys, value: string): void => {
	if (!validateStyleKey(styleKey, 'StyleManager → setStyle')) return;
	if (!validateStyleValue(styleKey, value, 'StyleManager → setStyle')) return;

	const allBlocks = useBlockStore.getState().allBlocks;
	if (!validateBlock(allBlocks[blockID], 'StyleManager → setStyle')) return;

	const updateBlock = useBlockStore.getState().updateBlock;
	const device = usePageStore.getState().currentDevice.value;
	const orientation = usePageStore.getState().currentOrientation.value;
	const pseudo = usePageStore.getState().currentPseudo.value;

	const block = allBlocks[blockID];
	const updatedBlock = {
		...block,
		styles: {
			...block.styles,
			[device]: {
				...block.styles?.[device],
				[orientation]: {
					...block.styles?.[device]?.[orientation],
					[pseudo]: {
						...block.styles?.[device]?.[orientation]?.[pseudo],
						[styleKey]: value,
					},
				},
			},
		},
	};

	// If the styleKey is a CSS shorthand (e.g. 'margin', 'padding'), set all its longhand properties
	if (StyleShorthandDefinitions[styleKey]) {
		StyleShorthandDefinitions[styleKey].forEach((longhand) => {
			const shorthandBlock = {
				...block,
				styles: {
					...block.styles,
					[device]: {
						...block.styles?.[device],
						[orientation]: {
							...block.styles?.[device]?.[orientation],
							[pseudo]: {
								...block.styles?.[device]?.[orientation]?.[pseudo],
								[longhand]: value,
							},
						},
					},
				},
			};
			updateBlock(blockID, shorthandBlock);
		});
	} else {
		// Otherwise, set the single styleKey directly
		updateBlock(blockID, updatedBlock);
	}
};

/**
 * Copies a style styleKey value to clipboard.
 * Logs success/failure and validates styleKey.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS styleKey to copy
 */
export const copyStyle = (blockID: BlockID, styleKey: StyleKeys): void => {
	const value = getStyle(blockID, styleKey);
	if (!validateStyleKey(styleKey, 'StyleManager → copyStyle')) return;
	if (!validateStyleValue(styleKey, value, 'StyleManager → copyStyle')) return;

	// Copy the value to clipboard
	navigator.clipboard
		.writeText(value)
		.then(() => {
			devLog.info(`Copied style ${styleKey}: ${value}`);
		})
		.catch((err) => {
			devLog.error(`Failed to copy style ${styleKey}:`, err);
		});
};

/**
 * Pastes a style styleKey value from clipboard.
 * Validates clipboard content and styleKey before setting.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS styleKey to paste
 */
export const pasteStyle = (blockID: BlockID, styleKey: StyleKeys): void => {
	navigator.clipboard
		.readText()
		.then((text) => {
			if (!validateStyleKey(styleKey, 'StyleManager → pasteStyle')) return;
			if (!validateStyleValue(styleKey, text, 'StyleManager → pasteStyle')) return;

			setStyle(blockID, styleKey, text);
			devLog.info(`Pasted style ${styleKey}: ${text}`);
		})
		.catch((err) => {
			devLog.error(`Failed to paste style ${styleKey}:`, err);
		});
};

/**
 * Resets a style value to empty string.
 * Validates styleKey before resetting.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS styleKey to reset
 */
export const resetStyle = (blockID: BlockID, styleKey: StyleKeys): void => {
	if (!validateStyleKey(styleKey, 'StyleManager → resetStyle')) return;

	// Reset the style to empty string
	setStyle(blockID, styleKey, '');
};

/**
 * Reactive hook to get a style value.
 * Re-renders component when the style value changes.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS styleKey to get
 * @returns The current style value
 */
export const useStyle = (blockID: BlockID, styleKey: StyleKeys): string => {
	if (!validateStyleKey(styleKey, 'StyleManager → useStyle')) return '';

	// Subscribe to both block changes and page context changes
	const device = usePageStore((state) => state.currentDevice.value);
	const orientation = usePageStore((state) => state.currentOrientation.value);
	const pseudo = usePageStore((state) => state.currentPseudo.value);

	return useBlockStore((state) => {
		const block = state.allBlocks[blockID];
		if (!validateBlock(block, 'StyleManager → useStyle')) return '';

		const devices = usePageStore.getState().allDevices;
		const orientations = usePageStore.getState().allOrientations;
		const pseudos = usePageStore.getState().allPseudos;

		const defaultPseudo = pseudos[0].value;
		const defaultOrientation = orientations[0].value;
		const defaultDevice = devices[0].value;

		if (StyleShorthandDefinitions[styleKey]) {
			const values = StyleShorthandDefinitions[styleKey].map((longhand) => {
				return cascadeStyle(block.styles, longhand as StyleKeys, device, orientation, pseudo, defaultDevice, defaultOrientation, defaultPseudo);
			});

			const uniqueValues = Array.from(new Set(values.filter(Boolean)));
			if (uniqueValues.length === 1) {
				return uniqueValues[0]; // All sides are the same
			} else if (uniqueValues.length === 0) {
				return ''; // All sides are empty
			} else {
				return values[0]; // Sides have different values
			}
		}

		return cascadeStyle(block.styles, styleKey, device, orientation, pseudo, defaultDevice, defaultOrientation, defaultPseudo);
	});
};
