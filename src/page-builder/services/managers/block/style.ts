// Utilities
import { cascadeStyle } from '@/src/page-builder/core/block/style/utilities';
import { resolveShorthand } from '@/src/page-builder/core/block/style/utilities';
import { devLog } from '@/src/shared/utilities/dev';

// Helpers
import { validateStyleKey, validateStyleValue, hasShorthand, getShorthand } from '@/src/page-builder/services/helpers/block/style';

// Managers
import { useSelectedDeviceID, getSelectedDeviceID, getDeviceDefaultID, useSelectedOrientationID, getSelectedOrientationID, getOrientationDefaultID, useSelectedPseudoID, getSelectedPseudoID, getPseudoDefaultID } from '@/src/page-builder/services/managers/page';

// Stores
import useBlockStore from '@/src/page-builder/state/stores/block';

// Types
import type { BlockID } from '@/src/page-builder/core/block/block/types';
import type { StyleKeys } from '@/src/page-builder/core/block/style/types';

/**
 * Gets a style styleKey value with CSS cascade fallback logic.
 * Validates block and styleKey before lookup.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS styleKey to lookup
 * @returns The resolved value or empty string if not found
 */
export function getBlockStyle(blockID: BlockID, styleKey: StyleKeys): string {
	const keyValidation = validateStyleKey(styleKey);
	if (!keyValidation.success) {
		devLog.error(`[StyleManager → getBlockStyle] ${keyValidation.error}`);
		return '';
	}

	const blockStyles = useBlockStore.getState().allBlocks[blockID]?.styles;
	if (blockStyles === undefined) {
		devLog.error(`[StyleManager → getBlockStyle] Block styles not found`);
		return '';
	}

	const selectedDeviceID = getSelectedDeviceID();
	if (!selectedDeviceID) {
		devLog.error(`[StyleManager → getBlockStyle] Invalid device value: ${selectedDeviceID}`);
		return '';
	}

	const selectedOrientationID = getSelectedOrientationID();
	if (!selectedOrientationID) {
		devLog.error(`[StyleManager → getBlockStyle] No selected orientation ID`);
		return '';
	}
	const selectedPseudoID = getSelectedPseudoID();
	if (!selectedPseudoID) {
		devLog.error(`[StyleManager → getBlockStyle] No selected pseudo ID`);
		return '';
	}

	const defaultPseudo = getPseudoDefaultID();
	const defaultOrientation = getOrientationDefaultID();
	const defaultDevice = getDeviceDefaultID();

	if (hasShorthand(styleKey)) {
		const properties = getShorthand(styleKey);
		const values = properties.map((property) => {
			return cascadeStyle(blockStyles, property, selectedDeviceID, selectedOrientationID, selectedPseudoID, defaultDevice, defaultOrientation, defaultPseudo);
		});

		return resolveShorthand(values);
	}

	return cascadeStyle(blockStyles, styleKey, selectedDeviceID, selectedOrientationID, selectedPseudoID, defaultDevice, defaultOrientation, defaultPseudo);
}

/**
 * Sets a style styleKey value for the current device/orientation/pseudo context.
 * Handles CSS shorthand expansion and validates input.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS styleKey to set
 * @param value - The value to set
 */
export function setBlockStyle(blockID: BlockID, styleKey: StyleKeys, value: string): void {
	const keyValidation = validateStyleKey(styleKey);
	if (!keyValidation.success) return devLog.error(`[StyleManager → setBlockStyle] ${keyValidation.error}`);

	const valueValidation = validateStyleValue(styleKey, value);
	if (!valueValidation.success) return devLog.error(`[StyleManager → setBlockStyle] ${valueValidation.error}`);

	const blockStyles = useBlockStore.getState().allBlocks[blockID]?.styles;
	if (blockStyles === undefined) return devLog.error(`[StyleManager → setBlockStyle] Block styles not found`);

	const selectedDeviceID = getSelectedDeviceID();
	if (!selectedDeviceID) return devLog.error(`[StyleManager → setBlockStyle] Invalid device value: ${selectedDeviceID}`);

	const selectedOrientationID = getSelectedOrientationID();
	if (!selectedOrientationID) return devLog.error(`[StyleManager → setBlockStyle] No selected orientation ID`);

	const selectedPseudoID = getSelectedPseudoID();
	if (!selectedPseudoID) return devLog.error(`[StyleManager → setBlockStyle] No selected pseudo ID`);

	const block = useBlockStore.getState().allBlocks[blockID];
	if (!block) return;

	// If the styleKey is a CSS shorthand (e.g. 'margin', 'padding'), set all its longhand properties
	if (hasShorthand(styleKey)) {
		const longhands = getShorthand(styleKey);
		longhands.forEach((longhand) => {
			const shorthandBlock = {
				...block,
				styles: {
					...block.styles,
					[selectedDeviceID]: {
						...block.styles?.[selectedDeviceID],
						[selectedOrientationID]: {
							...block.styles?.[selectedDeviceID]?.[selectedOrientationID],
							[selectedPseudoID]: {
								...block.styles?.[selectedDeviceID]?.[selectedOrientationID]?.[selectedPseudoID],
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
				[selectedDeviceID]: {
					...block.styles?.[selectedDeviceID],
					[selectedOrientationID]: {
						...block.styles?.[selectedDeviceID]?.[selectedOrientationID],
						[selectedPseudoID]: {
							...block.styles?.[selectedDeviceID]?.[selectedOrientationID]?.[selectedPseudoID],
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
 * Copies a style styleKey value to clipboard.
 * Logs success/failure and validates styleKey.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS styleKey to copy
 */
export function copyBlockStyle(blockID: BlockID, styleKey: StyleKeys): void {
	const keyValidation = validateStyleKey(styleKey);
	if (!keyValidation.success) return devLog.error(`[StyleManager → resetBlockStyle] ${keyValidation.error}`);

	const value = getBlockStyle(blockID, styleKey);
	const valueValidation = validateStyleValue(styleKey, value);
	if (!valueValidation.success) return devLog.error(`[StyleManager → copyBlockStyle] ${valueValidation.error}`);

	// Copy the value to clipboard
	navigator.clipboard
		.writeText(value)
		.then(() => {
			devLog.info(`Copied style ${styleKey}: ${value}`);
		})
		.catch((err) => {
			devLog.error(`Failed to copy style ${styleKey}:`, err);
		});
}

/**
 * Pastes a style styleKey value from clipboard.
 * Validates clipboard content and styleKey before setting.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS styleKey to paste
 */
export function pasteBlockStyle(blockID: BlockID, styleKey: StyleKeys): void {
	const keyValidation = validateStyleKey(styleKey);
	if (!keyValidation.success) return devLog.error(`[StyleManager → resetBlockStyle] ${keyValidation.error}`);

	navigator.clipboard
		.readText()
		.then((text) => {
			const valueValidation = validateStyleValue(styleKey, text);
			if (!valueValidation.success) return devLog.error(`[StyleManager → pasteBlockStyle] ${valueValidation.error}`);

			setBlockStyle(blockID, styleKey, text);
			devLog.info(`Pasted style ${styleKey}: ${text}`);
		})
		.catch((err) => {
			devLog.error(`Failed to paste style ${styleKey}:`, err);
		});
}

/**
 * Resets a style value to empty string.
 * Validates styleKey before resetting.
 *
 * @param blockID - The block identifier
 * @param styleKey - The CSS styleKey to reset
 */
export function resetBlockStyle(blockID: BlockID, styleKey: StyleKeys): void {
	const keyValidation = validateStyleKey(styleKey);
	if (!keyValidation.success) return devLog.error(`[StyleManager → resetBlockStyle] ${keyValidation.error}`);

	setBlockStyle(blockID, styleKey, '');
}

/**
 * Reactive hook to get a block's style value with cascade logic.
 * Validates styleKey before lookup.
 * @param blockID - The block identifier
 * @param styleKey - The CSS styleKey to retrieve
 * @returns The resolved style value or empty string if not found
 */
export function useBlockStyle(blockID: BlockID, styleKey: StyleKeys): string {
	const keyValidation = validateStyleKey(styleKey);
	if (!keyValidation.success) {
		devLog.error(`[StyleManager → useBlockStyle] ${keyValidation.error}`);
		return '';
	}

	const selectedDeviceID = useSelectedDeviceID();
	if (!selectedDeviceID) {
		devLog.error(`[StyleManager → useBlockStyle] Invalid device value: ${selectedDeviceID}`);
		return '';
	}

	const selectedOrientationID = useSelectedOrientationID();
	if (!selectedOrientationID) {
		devLog.error(`[StyleManager → useBlockStyle] No selected orientation ID`);
		return '';
	}
	const selectedPseudoID = useSelectedPseudoID();
	if (!selectedPseudoID) {
		devLog.error(`[StyleManager → useBlockStyle] No selected pseudo ID`);
		return '';
	}

	const defaultPseudo = getPseudoDefaultID();
	const defaultOrientation = getOrientationDefaultID();
	const defaultDevice = getDeviceDefaultID();

	return useBlockStore((state) => {
		const styles = state.allBlocks[blockID]?.styles;
		if (!styles) return '';

		if (hasShorthand(styleKey)) {
			const properties = getShorthand(styleKey);
			const values = properties.map((property) => {
				return cascadeStyle(styles, property, selectedDeviceID, selectedOrientationID, selectedPseudoID, defaultDevice, defaultOrientation, defaultPseudo);
			});
			return resolveShorthand(values);
		}

		return cascadeStyle(styles, styleKey, selectedDeviceID, selectedOrientationID, selectedPseudoID, defaultDevice, defaultOrientation, defaultPseudo);
	});
}
