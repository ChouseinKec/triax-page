import type { StyleOptionDefinition } from '@/src/core/block/style/types';

/** Props for function style value editor components. */
export type FunctionValueProps = {
	/** Current function value */
	value: string;
	/** Available function options */
	options: StyleOptionDefinition[];
	/** Callback when the value changes */
	onChange: (value: string) => void;
};
