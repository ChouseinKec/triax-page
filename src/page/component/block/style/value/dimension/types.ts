import type { OptionDefinition } from '@/src/shared/components/types/option';

/** Props for dimension style value editor components. */
export type DimensionValueProps = {
	/** Current dimension value */
	value: string;
	/** Available unit options */
	options: OptionDefinition[];
	/** Callback when the value changes */
	onChange: (value: string) => void;
};
