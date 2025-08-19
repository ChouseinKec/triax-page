import type { CSSInputOptionDefinition } from '@/types/block/style/option';

export interface NumberValueProps {
	/** The current value of the length input, e.g., "10px", "auto", "repeat(1, 20px)". */
	value: string;

	/** Array of options for the unit dropdown, each option should have a value and category. */
	options: CSSInputOptionDefinition[];

	/** Callback function to handle value changes. */
	onChange: (value: string) => void;

	/** Indicates if the value is an integer. */
	forceInteger?: boolean;
}
