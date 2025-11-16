import type { StyleOptionDefinition } from '@/src/core/block/style/types';

/** Props for multiple slot style value editor components */
export type BlockStylesSlotsProps = {
	/** Current slot values */
	values: string[];
	/** Available options for each slot */
	options: StyleOptionDefinition[][];
	/** Callback when the values change */
	onChange: (values: string[]) => void;
};
