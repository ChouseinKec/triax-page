import { OptionData } from 'types/option';

export type NumverValueProps = {
	/**
	 * The current value of the length input, e.g., "10px", "auto", "repeat(1, 20px)".
	 * @type {string}
	 */
	value?: string;

	/**
	 * The minimum numeric value allowed, default is -Infinity.
	 * @type {number}
	 */
	minValue?: number;

	/**
	 * The maximum numeric value allowed, default is Infinity.
	 * @type {number}
	 */
	maxValue?: number;

	/**
	 * Array of options for the unit dropdown, each option should have a value and category.
	 * @type {STYLE_OPTION[]}
	 */
	options?: OptionData[];

	/**
	 * If true, empty inputs are replaced with defaults, default is false.
	 * @type {boolean}
	 */
	isStrict?: boolean;

	/**
	 * Callback function to handle value changes.
	 * @type {(value: string) => void}
	 */
	onChange?: (value: string) => void;
};
