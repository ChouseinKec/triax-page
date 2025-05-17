/**
 * Props for the NumberInput component.
 * 
 * @param {string} [value] - Current input value as a string (default: '')
 * @param {number} [minValue] - Minimum allowed numeric value (default: -Infinity)
 * @param {number} [maxValue] - Maximum allowed numeric value (default: Infinity)
 * @param {string} [pattern] - Pattern to check the value with (default: null)
 * @param {(value: string) => void} [onChange] - Callback triggered when the input value changes
*/
export type TEXT_INPUT = {
	value?: string;
	minLength?: number;
	maxLength?: number;
	pattern?: 'url';
	onChange?: (value: string) => void;
};
