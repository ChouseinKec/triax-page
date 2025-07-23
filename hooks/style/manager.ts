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
import { getStyleWithFallback } from '@/utilities/style/cascade';

// Stores
import usePageStore from '@/stores/page/store';
import useBlockStore from '@/stores/block/store';

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

			/**
			 * Builds a media query string for device and orientation
			 */
			const getMediaQuery = (deviceName: string, orientationName: string): string => {
				const device = devices.find((d) => d.value === deviceName);
				const orientation = orientations.find((o) => o.value === orientationName);

				if (!device || !orientation) return '';

				// No media query for 'all' device and 'all' orientation
				if (deviceName === 'all' && orientationName === 'all') return '';

				// Device-only media query
				if (deviceName !== 'all' && orientationName === 'all') {
					return `@media (min-width: ${device.media.min}px)${device.media.max === Infinity ? '' : ` and (max-width: ${device.media.max}px)`}`;
				}

				// Orientation-only media query
				if (deviceName === 'all' && orientationName !== 'all') {
					return `@media (orientation: ${orientationName})`;
				}

				// Combined device + orientation media query
				if (deviceName !== 'all' && orientationName !== 'all') {
					return `@media (min-width: ${device.media.min}px)${device.media.max === Infinity ? '' : ` and (max-width: ${device.media.max}px)`} and (orientation: ${orientationName})`;
				}

				return '';
			};

			/**
			 * Generates CSS selector with pseudo-state
			 */
			const getSelector = (blockID: string, pseudoName: string): string => {
				const pseudoSelector = pseudoName === 'all' ? '' : `:${pseudoName}`;
				return `#block-${blockID}${pseudoSelector}`;
			};

			/**
			 * Converts camelCase CSS property to kebab-case
			 */
			const formatCSSProperty = (property: string): string => {
				return property.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
			};

			/**
			 * Generates CSS properties block
			 */
			const generateCSSProperties = (styles: Record<string, string>, indentLevel = 1): string => {
				const indent = '  '.repeat(indentLevel);
				let css = '';

				for (const [property, value] of Object.entries(styles)) {
					if (!value) continue;
					const cssProperty = formatCSSProperty(property);
					css += `${indent}${cssProperty}: ${value};\n`;
				}

				return css;
			};

			/**
			 * Generates CSS rules for a specific pseudo state
			 */
			const generatePseudoRules = (blockID: string, pseudoName: string, pseudoStyles: Record<string, string>, indentLevel = 0): string => {
				if (!pseudoStyles || Object.keys(pseudoStyles).length === 0) return '';

				const indent = '  '.repeat(indentLevel);
				const selector = getSelector(blockID, pseudoName);

				let css = `${indent}${selector} {\n`;
				css += generateCSSProperties(pseudoStyles, indentLevel + 1);
				css += `${indent}}\n`;

				return css;
			};

			/**
			 * Generates CSS rules for a specific orientation
			 */
			const generateOrientationRules = (blockID: string, orientationName: string, orientationStyles: Record<string, Record<string, string>>): string => {
				if (!orientationStyles) return '';

				let css = '';

				// Process each pseudo state within this orientation
				for (const [pseudoName, pseudoStyles] of Object.entries(orientationStyles)) {
					css += generatePseudoRules(blockID, pseudoName, pseudoStyles, 1);
				}

				return css;
			};

			/**
			 * Generates CSS rules for a specific device
			 */
			const generateDeviceRules = (blockID: string, deviceName: string, deviceStyles: Record<string, Record<string, Record<string, string>>>): string => {
				if (!deviceStyles) return '';

				let css = '';

				// Process each orientation within this device
				for (const [orientationName, orientationStyles] of Object.entries(deviceStyles)) {
					if (!orientationStyles) continue;

					const mediaQuery = getMediaQuery(deviceName, orientationName);
					const orientationCSS = generateOrientationRules(blockID, orientationName, orientationStyles);

					if (!orientationCSS) continue;

					if (mediaQuery) {
						css += `${mediaQuery} {\n`;
						css += orientationCSS;
						css += '}\n';
					} else {
						// No media query needed (default styles)
						css += orientationCSS;
					}
				}

				return css;
			};

			// Main CSS generation logic
			let css = '';

			// Process each device (breakpoint)
			for (const [deviceName, deviceStyles] of Object.entries(styles)) {
				css += generateDeviceRules(blockID, deviceName, deviceStyles);
			}

			return css;
		},
		[devices, orientations]
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
