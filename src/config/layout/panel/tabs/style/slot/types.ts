import type { OptionDefinition } from '@/shared/components/types/option';

/** Props for slot style value editor components. */
export type BlockStyleSlotProps = {
	/** Current slot value */
	value: string;
	/** Available options for the slot */
	options: OptionDefinition[];
	/** Callback when the value changes */
	onChange: (value: string) => void;
};
