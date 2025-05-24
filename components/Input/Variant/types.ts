import { STYLE_VALUE } from '@/editors/style/constants/types';

/**
 * Props for the MultiInput component.
 *
 * @param {string} [value] - Combined string value (e.g., "10px,20px,30px")
 * @param {string} separator - Character used to split/join values (e.g., "," or " ")
 * @param {(value: string) => void} [onChange] - Callback triggered when the combined value changes
 */
export type VARIANT_INPUT = {
	value?: string;
	separator: string;
	option: STYLE_VALUE;
	onChange?: (value: string) => void;
};
