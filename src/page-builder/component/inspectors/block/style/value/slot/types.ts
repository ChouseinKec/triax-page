import type { StyleOptionDefinition } from '@/src/page-builder/core/block/style/types';

/** Props for slot style value editor components. */
export type BlockStylesSlotProps = {
	/** Current slot value */
	value: string;
	/** Available options for the slot */
	options: StyleOptionDefinition[];
	/** Callback when the value changes */
	onChange: (value: string) => void;
};
