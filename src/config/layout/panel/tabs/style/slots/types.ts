import type { OptionDefinition } from '@/shared/components/types/option';

/** Props for multiple slot style value editor components */
export type NodeStyleslotsProps = {
	/** Current slot values */
	values: string[];
	/** Available options for each slot */
	options: OptionDefinition[][];
	/** Callback when the values change */
	onChange: (values: string[]) => void;
};
