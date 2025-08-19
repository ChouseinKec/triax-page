import type { BooleanMap } from "@/types/block/attribute/value";

/**
 * Props for the Input Toggle component.
 */
export interface InputToggleProps {
	/**
	 * Current value of the toggle. Must be the string 'true' or 'false'.
	 * The component will render differently based on this value.
	 */
	value: string;

	/**
	 * Callback invoked when the toggle changes. Receives the new value
	 * (as a string, either 'true' or 'false').
	 */
	onChange: (value: string) => void;

	/**
	 * Optional mapping that provides both the display label and the actual
	 * value associated with each boolean state.
	 *
	 * When provided, the component will:
	 * - use the mapped string for display (label) for each state, and
	 * - use the mapped string as the value emitted to `onChange` / stored
	 *   as the toggle's chosen value for the corresponding boolean state.
	 *
	 * Keys must be the string literals 'true' and 'false'. Example:
	 *
	 * { true: 'On',  false: 'Off' }   // displays "On"/"Off" and emits 'On'/'Off'
	 * { true: 'yes', false: 'no' }   // displays "yes"/"no" and emits 'yes'/'no'
	 * { true: 'on',  false: 'off' }  // emits 'on' or 'off' depending on state
	 * If omitted, the component falls back to its default labels/values.
	 */
	options?: BooleanMap;
}
