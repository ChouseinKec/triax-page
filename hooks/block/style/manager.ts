import { useCallback } from 'react';

// Constants
import { CSSPropertyKey } from '@/types/block/style/property';
import { CSSPropertyShortDefinitions as PropertyShorthands } from '@/constants/style/property';

// Utilities
import { devLog } from '@/utilities/dev';
import { isPropertyValid } from '@/utilities/style/property';
import { isValueValid } from '@/utilities/style/value';
import { getStyleWithFallback } from '@/utilities/style/cascade';

// Stores
import usePageStore from '@/stores/page/store';
import useBlockStore from '@/stores/block/store';

interface StyleManager {
	getStyle: (property: CSSPropertyKey) => string;
	setStyle: (property: CSSPropertyKey, value: string) => void;
	copyStyle: (property: CSSPropertyKey) => void;
	pasteStyle: (property: CSSPropertyKey) => void;
	resetStyle: (property: CSSPropertyKey) => void;

}

export const useStyleManager = (): StyleManager => {
	const setBlockStyle = useBlockStore((state) => state.setBlockStyle);
	const selectedBlockID = useBlockStore((state) => state.selectedBlockID);
	const blockStyles = useBlockStore((state) => (selectedBlockID ? state.allBlocks[selectedBlockID]?.styles : undefined));

	const device = usePageStore((state) => state.currentDevice.value);
	const devices = usePageStore((state) => state.allDevices);

	const orientation = usePageStore((state) => state.currentOrientation.value);
	const orientations = usePageStore((state) => state.allOrientations);

	const pseudos = usePageStore((state) => state.allPseudos);
	const pseudo = usePageStore((state) => state.currentPseudo.value);

	/**
	 * Gets a style property value with CSS cascade fallback logic
	 * Internal function that handles the actual lookup logic.
	 * Should not be used directly outside this hook as it does not validate properties.
	 * @param {CSSPropertyKey} property - The style property to lookup (e.g. 'color', 'fontSize')
	 * @returns {string} The resolved value or empty string if not found
	 *
	 * @example
	 * // Current context: tablet/landscape/hover
	 * _getStyle('backgroundColor') looks up:
	 * 1. tablet/landscape/hover
	 * 2. tablet/landscape/default
	 * 3. tablet/default/hover
	 * 4. tablet/default/default
	 * 5. default/landscape/hover
	 * 6. default/landscape/default
	 * 7. default/default/hover
	 * 8. default/default/default
	 *
	 * @example
	 * // Basic usage
	 * const fontSize = _getStyle('fontSize');
	 *
	 * @example
	 * // With responsive fallback
	 * <div style={{ color: _getStyle('textColor') || 'black' }}>
	 */
	const _getStyle = useCallback(
		(property: CSSPropertyKey): string => {
			const defaultPseudo = pseudos[0].value;
			const defaultOrientation = orientations[0].value;
			const defaultDevice = devices[0].value;

			if (!blockStyles) return '';

			return getStyleWithFallback(blockStyles, property, device, orientation, pseudo, defaultDevice, defaultOrientation, defaultPseudo);
		},
		[blockStyles, device, orientation, pseudo]
	);

	/**
	 * Sets a style property value for the current device/orientation/pseudo context
	 * Internal function that handles the actual setting logic.
	 * Should not be used directly outside this hook as it does not validate properties or values.
	 * @param {CSSPropertyKey} property - The style property to set (e.g. 'color', 'fontSize')
	 * @param {string} value - The value to set for the property
	 *
	 * @example
	 * // Sets background color for current context
	 * _setStyle('backgroundColor', '#ff0000');
	 */
	const _setStyle = useCallback(
		(property: CSSPropertyKey, value: string): void => {
			if (!selectedBlockID) return;

			setBlockStyle(selectedBlockID, device, orientation, pseudo, property, value);
		},
		[setBlockStyle, selectedBlockID, device, orientation, pseudo]
	);

	/**
	 * Sets a single style property value for current _device/_pseudo
	 * @param {CSSPropertyKey} property - The style property to set
	 * @param {string} value - The value to set for the property
	 * @throws {Error} If property conversion fails or value is invalid
	 */
	const setStyle = useCallback<StyleManager['setStyle']>(
		(property, value) => {
			if (!isPropertyValid(property)) return devLog.error(`Error setting style property: ${property} is not valid`);

			// If value is not empty and value is not valid
			if (value !== '' && !isValueValid(property, value)) return devLog.error(`Error setting style value: ${value} is not valid`);

			// If the property is a CSS shorthand (e.g. 'margin', 'padding'), set all its longhand properties
			if (PropertyShorthands[property]) {
				PropertyShorthands[property].forEach((longhand) => {
					_setStyle(longhand, value);
				});
			} else {
				// Otherwise, set the single property directly
				_setStyle(property, value);
			}
		},
		[_setStyle]
	);

	/**
	 * Gets a style with CSS-like cascading behavior
	 * @param {CSSPropertyKey} property - The style property to get
	 * @returns {string} The current property value or empty string if not found
	 * @throws {Error} If property conversion fails
	 */
	const getStyle = useCallback<StyleManager['getStyle']>(
		(property) => {
			if (!isPropertyValid(property)) {
				devLog.error(`Error getting single-style property: ${property} is not valid`);
				return '';
			}

			if (PropertyShorthands[property]) {
				const values = PropertyShorthands[property].map((longhand) => _getStyle(longhand as CSSPropertyKey));

				const uniqueValues = Array.from(new Set(values.filter(Boolean)));
				if (uniqueValues.length === 1) {
					return uniqueValues[0]; // All sides are the same
				} else if (uniqueValues.length === 0) {
					return ''; // All sides are empty
				} else {
					return values[0]; // Sides have different values
				}
			}

			return _getStyle(property);
		},
		[_getStyle]
	);

	/**
	 * Copies a style property value to clipboard
	 * @param {CSSPropertyKey} property - The style property to copy
	 * @returns {string} The copied value or empty string if not found
	 */
	const copyStyle = useCallback<StyleManager['copyStyle']>(
		(property) => {
			const value = getStyle(property);

			// If property is not valid
			if (value === '') {
				devLog.error(`Error copying style: ${property} is not set`);
				return;
			}

			// Copy the value to clipboard
			navigator.clipboard
				.writeText(value)
				.then(() => {
					devLog.info(`Copied style ${property}: ${value}`);
				})
				.catch((err) => {
					devLog.error(`Failed to copy style ${property}:`, err);
				});
		},
		[getStyle]
	);

	/**
	 * Pastes a style property value from clipboard
	 * @param {CSSPropertyKey} property - The style property to paste
	 * @returns {void}
	 */
	const pasteStyle = useCallback<StyleManager['pasteStyle']>(
		(property) => {
			navigator.clipboard
				.readText()
				.then((text) => {
					// If property is not valid
					if (!isPropertyValid(property)) {
						devLog.error(`Error pasting style: ${property} is not valid`);
						return;
					}

					// If value is not valid
					if (text !== '' && !isValueValid(property, text)) {
						devLog.error(`Error pasting style: ${text} is not valid for ${property}`);
						return;
					}

					_setStyle(property, text);
					devLog.info(`Pasted style ${property}: ${text}`);
				})
				.catch((err) => {
					devLog.error(`Failed to paste style ${property}:`, err);
				});
		},
		[_setStyle]
	);

	/**
	 * Resets a style property value to empty string
	 * @param {CSSPropertyKey} property - The style property to reset
	 * @returns {void}
	 */
	const resetStyle = useCallback<StyleManager['resetStyle']>(
		(property) => {
			// If property is not valid
			if (!isPropertyValid(property)) {
				devLog.error(`Error resetting style: ${property} is not valid`);
				return;
			}

			// Reset the style to empty string
			_setStyle(property, '');
		},
		[_setStyle]
	);



	// Return the style manager methods
	return {
		getStyle,
		setStyle,
		copyStyle,
		pasteStyle,
		resetStyle,
	};
};
