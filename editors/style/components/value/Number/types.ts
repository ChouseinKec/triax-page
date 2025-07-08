import type { InputOptionData } from 'types/option';

export interface NumberValueProps {
	/** The current value of the length input, e.g., "10px", "auto", "repeat(1, 20px)". */
	value: string;

	/** Array of options for the unit dropdown, each option should have a value and category. */
	options: InputOptionData[];

	/** Callback function to handle value changes. */
	onChange: (value: string) => void;

	/** The minimum value allowed for the input, defaults to -Infinity. */
	min?: number;

	/** The maximum value allowed for the input, defaults to Infinity. */
	max?: number;

	/** Indicates if the value is an integer. */
	forceInteger?: boolean;
}
