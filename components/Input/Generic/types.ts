import { CSSProperties } from 'react';

export interface GenericInputProps {
	/** The current value of the input */
	value: string;

	/** Callback when the input value changes */
	onChange: (value: string) => void;

	/** Input type, either 'text' or 'number' */
	type?: 'text' | 'number';

	/** Placeholder text for the input */
	placeholder?: string;

	/** Minimum value (for number types) or minimum length (for text types) */
	min?: number;

	/** Maximum value (for number types) or maximum length (for text types) */
	max?: number;

	/** Optional title attribute for additional context */
	title?: string; // Optional title attribute for additional context

	/** Optional inline styles for the input */
	style?: CSSProperties;

	/** Optional className for custom styling */
	className?: string;

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
