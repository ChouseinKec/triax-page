import { FunctionOptionData } from '@/types/option';

/**
 * Props for the FunctionValue component.
 * Used to render and manage a CSS function value input (e.g., fit-content(10px)).
 */
export interface FunctionValueProps {
	/**
	 * The option for the function parameter(s).
	 */
	option: FunctionOptionData;
	/**
	 * The current value of the function input as a string.
	 */
	value: string;
	/**
	 * Callback fired when the value changes.
	 * @param value - The new value string.
	 */
	onChange: (value: string) => void;
}
