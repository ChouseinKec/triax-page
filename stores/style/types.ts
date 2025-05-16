import { STYLES_CONSTANTS_KEY } from '@/editors/style/constants/styles';

export type STYLE_STORE = {
	/**
	 * Sets a style property value for the current device/orientation/pseudo context
	 *
	 * @param {STYLES_CONSTANTS_KEY} property - The style property to set (e.g. 'color', 'fontSize')
	 * @param {string} value - The value to set for the property
	 *
	 * @example
	 * // Sets background color for current context
	 * setStyle('backgroundColor', '#ff0000');
	 */
	setStyle: (property: STYLES_CONSTANTS_KEY, value: string) => void;
	/**
	 * Gets a style property value with CSS cascade fallback logic
	 *
	 * @param {STYLES_CONSTANTS_KEY} property - The style property to lookup (e.g. 'color', 'fontSize')
	 * @returns {string} The resolved value or empty string if not found
	 *
	 * @example
	 * // Current context: tablet/landscape/hover
	 * getStyle('backgroundColor') looks up:
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
	 * const fontSize = getStyle('fontSize');
	 *
	 * @example
	 * // With responsive fallback
	 * <div style={{ color: getStyle('textColor') || 'black' }}>
	 */
	getStyle: (property: STYLES_CONSTANTS_KEY) => string;
};
