export type LinkValueProps = {
	/**
	 * The current value of the link.
	 * This should be a valid URL or a string representing the link.
	 */
	value: string;

	/**
	 * Callback function to handle value changes.
	 */
	onChange: (value: string) => void;
};
