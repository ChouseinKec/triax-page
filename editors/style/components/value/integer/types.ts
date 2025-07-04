import { InputOptionData } from 'types/option';

export type IntegerValueProps = {
	/**
	 * The current value of the length input, e.g., "10px", "auto", "repeat(1, 20px)".
	 */
	value?: string;

	/**
	 * The minimum numeric value allowed, default is -Infinity.
	 */
	minValue?: number;

	/**
	 * The maximum numeric value allowed, default is Infinity.
	 */
	maxValue?: number;

	/**
	 * Array of options for the unit dropdown, each option should have a value and category.
	 */
	options?: InputOptionData[];

	/**
	 * Callback function to handle value changes.
	 */
	onChange?: (value: string) => void;
};
