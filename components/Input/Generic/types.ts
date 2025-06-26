/**
 * Props for the GenericInput component.
 * Defines the expected properties for a generic input field.
 */
export interface GenericInputProps {
	/** The current value of the input */
	value?: string;

	/** Minimum value (for number input types) */
	min?: number;

	/** Maximum value (for number input types) */
	max?: number;

	/** Input type, either 'text' or 'number' */
	type?: 'text' | 'number';

	/** Placeholder text for the input */
	placeholder?: string;

	/** Prefix text to display before the input value */
	prefix?: string;

	/** Suffix text to display after the input value */
	suffix?: string;

	/**
	 * Optional validation function.
	 * Should return an object with status and message.
	 */
	validate?: (value: string) => {
		status: boolean;
		message: string;
	};

	/** Callback when the input value changes */
	onChange: (value: string) => void;

	/** Callback when the input receives focus */
	onFocus?: () => void;

	/** Callback when the input loses focus */
	onBlur?: () => void;
}
