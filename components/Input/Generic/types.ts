export interface GenericInputProps {
	/** The current value of the input */
	value: string;

	/** Callback when the input value changes */
	onChange: (value: string) => void;

	/** Input type, either 'text' or 'number' */
	type?: 'text' | 'number';

	/** Placeholder text for the input */
	placeholder?: string;

	/** Prefix text to display before the input value */
	prefix?: string;

	/** Suffix text to display after the input value */
	suffix?: string;

	/** Minimum value (for number types) or minimum length (for text types) */
	min?: number;

	/** Maximum value (for number types) or maximum length (for text types) */
	max?: number;

	/** ARIA label for the input - primary accessible name */
	ariaLabel?: string;

	/** Optional title attribute for additional context */
	title?: string; // Optional title attribute for additional context

	/**
	 * Optional validation function.
	 * Should return an object with status and message.
	 */
	onValidate?: (value: string) => {
		status: boolean;
		message: string;
	};

	/** Callback when the input receives focus */
	onFocus?: () => void;

	/** Callback when the input loses focus */
	onBlur?: () => void;
}
