/**
 * Props for the NumberInput component.
 * 
 * @param {string} [value] - Current input value as a string (default: '')
 * @param {number} [minValue] - Minimum allowed numeric value (default: -Infinity)
 * @param {number} [maxValue] - Maximum allowed numeric value (default: Infinity)
 * @param {(value: string) => void} [onChange] - Callback triggered when the input value changes
*/
export type NUMBER_INPUT = {
	value?: string;
	minValue?: number;
	maxValue?: number;
	onChange?: (value: string) => void;
};
