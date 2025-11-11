/** Props for color style value editor components. */
export type ColorValueProps = {
	/** Current color value */
	value: string;
	/** Callback when the color changes */
	onChange: (value: string) => void;
};
