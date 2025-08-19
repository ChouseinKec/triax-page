import type { OptionDefinition } from '@/types/option';

export type HTMLValueSeparator = ',' | ' ';
export type HTMLValueType = 'list' | 'number' | 'boolean' | 'string';
/**
 * A boolean represented as a string literal.
 * Use this type anywhere the toggle value is stored or passed around as text.
 *
 * Example: 'true' or 'false'
 */
export type BooleanString = 'true' | 'false';

/**
 * A mapping of the two boolean string states to a display string.
 *
 * Example:
 * { 'true': 'On', 'false': 'Off' }
 */
export type BooleanMap = Record<BooleanString, string>;

export type HTMLValueListSyntax = {
	type: 'list';
	options: OptionDefinition[];
	separator?: HTMLValueSeparator;
};

export type HTMLValueNumberSyntax = {
	type: 'number';
	min?: number;
	max?: number;
};

export type HTMLValueBooleanSyntax = {
	type: 'boolean';
	/**
	 * Optional mapping for display values.
	 * If provided, the component will use these values for display and emit.
	 * Example: { true: 'On', false: 'Off' }
	 */
	options?: BooleanMap;
};

export type HTMLValueStringSyntax = {
	type: 'string';
};

export type HTMLValueSyntax = HTMLValueListSyntax | HTMLValueNumberSyntax | HTMLValueBooleanSyntax | HTMLValueStringSyntax;
