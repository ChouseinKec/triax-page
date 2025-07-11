import { StyleTokenDefinitions } from '@/constants/style/token';

/**
 * All valid CSS data type tokens used in value definition syntax (e.g. '<number>', '<length>', '<color>').
 * These correspond to the official CSS value definition data types from the CSS spec.
 * Used for type-safe parsing, expansion, and validation of CSS property values.
 */
export type StyleTokenKeys = keyof typeof StyleTokenDefinitions;
export type StyleTokenType = 'keyword' | 'function' | 'dimension' | 'number' | 'integer' | 'color' | 'link';

/**
 * Represents a single CSS data type definition, including its name and syntax.
 * Used for data type lookup, expansion, and validation.
 */
export interface StyleTokenData {
	/**
	 * The canonical name of the CSS data type (e.g. '<number>', '<length>').
	 */
	type: StyleTokenKeys;

	/**
	 * The value definition syntax for this data type (may reference other data types).
	 */
	syntax: string;
}
