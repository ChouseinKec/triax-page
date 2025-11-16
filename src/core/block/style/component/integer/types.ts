// Types
import type { StyleOptionDefinition } from '@/src/core/block/style/types';

/** Props for integer style value editor components. */
export type IntegerValueProps = {
	/** Current integer value as string */
	value: string;
	/** Callback when the value changes */
	onChange: (value: string) => void;
	/** Minimum allowed value */
	minValue?: number;
	/** Maximum allowed value */
	maxValue?: number;
	/** Available options for the value */
	options: StyleOptionDefinition[];
	/** Whether to enforce strict integer validation */
	isStrict?: boolean;
};
