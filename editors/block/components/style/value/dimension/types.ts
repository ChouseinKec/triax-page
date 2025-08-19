import { OptionDefinition } from 'types/option';

export type DimensionValueProps = {
	/**
	 * The current value of the length input, e.g., "10px", "auto", "repeat(1, 20px)".
	 */
	value: string;

	/**
	 * Array of options for the unit dropdown, each option should have a value and category.
	 */
	options: OptionDefinition[];

	/**
	 * Callback function to handle value changes.
	 */
	onChange: (value: string) => void;

};
