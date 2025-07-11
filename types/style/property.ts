import {StylePropertyDefinitions} from '@/constants/style/property';

/**
 * All valid CSS property names supported by the style system.
 * These correspond to official CSS property names (e.g. 'width', 'color', 'display').
 * Used for type-safe property lookup and validation.
 */
export type StylePropertyKeys = keyof typeof StylePropertyDefinitions;

/**
 * Represents a single CSS property definition, including its name, description, category,
 * and value definition syntax (raw, expanded, and parsed forms).
 * Used for property lookup, validation, and UI rendering.
 */
export interface StylePropertyData {
	/**
	 * The name of the CSS property (e.g. 'color', 'font-size').
	 * This is used for matching against user input and for validation.
	 */
	name: string;

	/**
	 * A brief description of the CSS property.
	 */
	description: string;

	/**
	 * The icon name for the CSS property.
	 * This is used for UI representation, typically as an icon in the property editor.
	 * It should correspond to an icon in the icon set used by the UI library.
	 */
	icon?: string;

	/**
	 * CSS Value Definition Syntax string.
	 * This is the raw syntax string that defines the valid values for this property.
	 * It may contain data-type references like `<length>`, `<color>`, etc.
	 * Taken from official CSS specifications.
	 */
	syntaxRaw: string;

	/**
	 * Expanded CSS Value Definition Syntax string (all datas expanded).
	 * Generated at runtime by the style parser for UI/validation logic.
	 */
	syntaxExpanded: string;

	/**
	 * Parsed representation of the CSS Value Definition Syntax string.
	 * Generated at runtime by the style parser for UI/validation logic.
	 */
	syntaxParsed: string[];

	/**
	 * Set of each token available in each slot of the syntax.
	 * Generated at runtime by the style parser for UI/validation logic.
	 */
	syntaxSet: Set<string>[];

	/**
	 * Normalized syntax representation for easier comparison and validation.
	 * This is a simplified version of the syntax that removes unnecessary separators, ranges,
	 * and normalizes function calls.
	 */
	syntaxNormalized: string[];

	/**
	 * Extracted separators for each variation in the syntax.
	 * This is used to determine how to join values correctly based on the syntax.
	 */
	syntaxSeparators: string[][];
}
