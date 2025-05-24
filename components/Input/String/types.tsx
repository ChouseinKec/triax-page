/**
 * Defines the props for the StringInput component
 * 
 * @property {string} [value=''] - Current input value as string
 * @property {number} [minLength=-Infinity] - Minimum allowed character length
 * @property {number} [maxLength=Infinity] - Maximum allowed character length
 * @property {'url'} [pattern] - Special validation pattern (currently only 'url' supported)
 * @property {(value: string) => void} [onChange] - Callback for validated value changes
 * 
 * @example
 * const props: STRING_INPUT = {
 *   value: 'example',
 *   minLength: 2,
 *   maxLength: 10,
 *   pattern: 'url',
 *   onChange: (val) => console.log(val)
 * }
 */

export type STRING_INPUT = {
	value?: string;
	minLength?: number;
	maxLength?: number;
	pattern?: string;
	onChange?: (value: string) => void;
};