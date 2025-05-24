/**
 * Defines the required props for child components used within MultiInput.
 *
 * @param {string} value - Current value for the individual input (e.g., "10px")
 * @param {(value: string) => void} onChange - Callback when the input's value changes
 */
export type MULTI_INPUT_CHILD = {
	value: string;
	onChange: (value: string) => void;
};

export type MULTI_INPUT_CHILDREN = React.ReactElement<MULTI_INPUT_CHILD> | React.ReactElement<MULTI_INPUT_CHILD>[];

/**
 * Props for the MultiInput component.
 *
 * @param {string} [value] - Combined string value (e.g., "10px,20px,30px")
 * @param {React.ReactElement<MULTI_INPUT_CHILD> | React.ReactElement<MULTI_INPUT_CHILD>[]} children - Input elements to render, each receiving a split value
 * @param {string} separator - Character used to split/join values (e.g., "," or " ")
 * @param {(value: string) => void} [onChange] - Callback triggered when the combined value changes
 */
export type MULTI_INPUT = {
	value?: string;
	children: MULTI_INPUT_CHILDREN;
	separator: string;
	onChange?: (value: string) => void;
};
