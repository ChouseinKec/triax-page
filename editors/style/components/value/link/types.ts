
export type IntegerValueProps = {
	/**
	 * The current value of the length input, e.g., "10px", "auto", "repeat(1, 20px)".
	 */
	value?: string;

	/**
	 * Callback function to handle value changes.
	 */
	onChange?: (value: string) => void;
};
