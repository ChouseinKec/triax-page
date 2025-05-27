

/**
 * NUMBER_INPUT
 * @typedef {Object} NUMBER_INPUT
 * @property {string} [value] - The current value of the number input.
 * @property {number} [minValue] - The minimum value allowed for the number input.
 * @property {number} [maxValue] - The maximum value allowed for the number input.
 * @property {(value: string) => void} [onChange] - Callback function triggered when the value changes.
 * @property {() => void} [onFocus] - Callback function triggered when the input gains focus.
 * @property {() => void} [onBlur] - Callback function triggered when the input loses focus.
 */
export type NUMBER_INPUT = {
	/**
	 * The current value of the number input.
	 * @type {string}
	*/
	value?: string;
	/**
	 * The minimum value allowed for the number input.
	 * @type {number}
	 */
	minValue?: number;
	/**
	 * The maximum value allowed for the number input.
	 * @type {number}
	 */
	maxValue?: number;
	/**
   * Callback function to handle value changes.
	 * @type {(value: string) => void}
	 */
	onChange?: (value: string) => void;
	/**
   * Callback function to handle focus events.
	 * @type {() => void}
	 */
	onFocus?: () => void;
	/**
   * Callback function to handle blur events.
	 * @type {() => void}
	 */
	onBlur?: () => void;
};
