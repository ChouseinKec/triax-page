import { useCallback } from 'react';
// Types
import type { BlockStyleData } from '@/types/block/block';

// Constants
import { StylePropertyKeys } from '@/types/style/property';
import { StylePropertyShorthandDefinitions as PropertyShorthands } from '@/constants/style/property';

// Utilities
import { devLog } from '@/utilities/dev';
import { isPropertyValid } from '@/utilities/style/property';
import { isValueValid } from '@/utilities/style/value';

// Stores
import useDeviceStore from '@/stores/device/store';
import useBlockStore from '@/stores/block/store';
import useOrientationStore from '@/stores/orientation/store';
import usePseudoStore from '@/stores/pseudo/store';

interface StyleManager {
	getStyle: (property: StylePropertyKeys) => string;
	setStyle: (property: StylePropertyKeys, value: string) => void;
	copyStyle: (property: StylePropertyKeys) => void;
	pasteStyle: (property: StylePropertyKeys) => void;
	resetStyle: (property: StylePropertyKeys) => void;

	generateCSS: (blockID: string, styles: BlockStyleData) => string | undefined;
}

export const useStyleManager = (): StyleManager => {
	const setBlockStyle = useBlockStore((state) => state.setBlockStyle);
	const selectedBlockID = useBlockStore((state) => state.selectedBlockID);
	const blockStyles = useBlockStore((state) => (selectedBlockID ? state.allBlocks[selectedBlockID]?.styles : undefined));
	const device = useDeviceStore((state) => state.currentDevice.name);
	const orientation = useOrientationStore((state) => state.currentOrientation.name);
	const pseudo = usePseudoStore((state) => state.currentPseudo.name);
	const devices = useDeviceStore.getState().getDevices();
	const orientations = useOrientationStore.getState().getOrientations();

	/**
	 * Gets a style property value with CSS cascade fallback logic
	 * Internal function that handles the actual lookup logic.
	 * Should not be used directly outside this hook as it does not validate properties.
	 * @param {StylePropertyKeys} property - The style property to lookup (e.g. 'color', 'fontSize')
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
		(property: StylePropertyKeys): string => {
			const defaultPseudo = 'default';
			const defaultOrientation = 'default';
			const defaultDevice = 'default';

			if (!blockStyles) return '';

			return (
				// 1. Exact match
				blockStyles[device]?.[orientation]?.[pseudo]?.[property] ??
				// 2. Same context, default pseudo
				blockStyles[device]?.[orientation]?.[defaultPseudo]?.[property] ??
				// 3. Default orientation
				blockStyles[device]?.[defaultOrientation]?.[pseudo]?.[property] ??
				blockStyles[device]?.[defaultOrientation]?.[defaultPseudo]?.[property] ??
				// 4. Default device
				blockStyles[defaultDevice]?.[orientation]?.[pseudo]?.[property] ??
				blockStyles[defaultDevice]?.[orientation]?.[defaultPseudo]?.[property] ??
				blockStyles[defaultDevice]?.[defaultOrientation]?.[pseudo]?.[property] ??
				// 5. Global fallback
				blockStyles[defaultDevice]?.[defaultOrientation]?.[defaultPseudo]?.[property] ??
				// 6. Empty string if nothing found
				''
			);
		},
		[blockStyles, device, orientation, pseudo]
	);

	/**
	 * Sets a style property value for the current device/orientation/pseudo context
	 * Internal function that handles the actual setting logic.
	 * Should not be used directly outside this hook as it does not validate properties or values.
	 * @param {StylePropertyKeys} property - The style property to set (e.g. 'color', 'fontSize')
	 * @param {string} value - The value to set for the property
	 *
	 * @example
	 * // Sets background color for current context
	 * _setStyle('backgroundColor', '#ff0000');
	 */
	const _setStyle = useCallback(
		(property: StylePropertyKeys, value: string): void => {
			if (!selectedBlockID) return;

			setBlockStyle(selectedBlockID, device, orientation, pseudo, property, value);
		},
		[setBlockStyle, selectedBlockID, device, orientation, pseudo]
	);

	/**
	 * Sets a single style property value for current _device/_pseudo
	 * @param {StylePropertyKeys} property - The style property to set
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
	 * @param {StylePropertyKeys} property - The style property to get
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
				const values = PropertyShorthands[property].map((longhand) => _getStyle(longhand as StylePropertyKeys));

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
	 * @param {StylePropertyKeys} property - The style property to copy
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
	 * @param {StylePropertyKeys} property - The style property to paste
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
	 * @param {StylePropertyKeys} property - The style property to reset
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

	/**
	 * Generates CSS for a block by processing its style configuration.
	 *
	 * @param {string} blockID - The ID of the block to generate CSS for.
	 * @returns {string | null} - The generated CSS, or null if it cannot be generated.
	 */
	const generateCSS = useCallback<StyleManager['generateCSS']>(
		(blockID, styles) => {
			if (!styles) return undefined;

			// Get devices and orientations

			let css = '';

			// Process each device (breakpoint)
			for (const [deviceName, deviceStyles] of Object.entries(styles)) {
				if (!deviceStyles) continue;

				// Process each orientation
				for (const [orientationName, orientationStyles] of Object.entries(deviceStyles)) {
					if (!orientationStyles) continue;

					// Get media queries for device + orientation
					const device = devices.find((d) => d.value === deviceName);
					const orientation = orientations.find((o) => o.value === orientationName);
					if (!device || !orientation) continue;

					// Build media query
					let mediaQuery = '';
					if (deviceName !== 'default') {
						mediaQuery = `@media ${device.media}`;
						mediaQuery += orientationName !== 'default' ? ` and (orientation: ${orientationName})` : ')';
					} else if (orientationName !== 'default') {
						mediaQuery = `@media (orientation: ${orientationName})`;
					}

					if (mediaQuery) css += `${mediaQuery} {\n`;

					// Process each pseudo state
					for (const [pseudoName, pseudoStyles] of Object.entries(orientationStyles)) {
						if (!pseudoStyles || Object.keys(pseudoStyles).length === 0) continue;

						const selector = pseudoName === 'default' ? '' : `:${pseudoName}`;

						// Generate class name based on block ID only
						css += `  #block-${blockID}${selector} {\n`;

						// Add each style property
						for (const [property, value] of Object.entries(pseudoStyles)) {
							if (!value) continue;
							const StylePropertyData = property.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
							css += `    ${StylePropertyData}: ${value};\n`;
						}

						css += '  }\n';
					}

					if (mediaQuery) css += '}\n';
				}
			}

			return css;
		},
		[useDeviceStore, useOrientationStore]
	);

	// Return the style manager methods
	return {
		getStyle,
		setStyle,
		copyStyle,
		pasteStyle,
		resetStyle,
		generateCSS,
	};
};
