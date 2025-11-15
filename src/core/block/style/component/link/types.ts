/** Props for link style value editor components.*/
export type LinkValueProps = {
	/** Current URL value */
	value: string;
	/** Callback when the URL changes */
	onChange: (value: string) => void;
};
