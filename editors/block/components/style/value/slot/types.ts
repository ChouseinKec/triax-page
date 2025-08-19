import type { CSSInputOptionDefinition } from '@/types/block/style/option';

export interface SlotProps {
	/** The current value for this slot. */
	value: string;

	/** The available options for this slot (for dropdowns, etc.). */
	options: CSSInputOptionDefinition[];
	
	/** Callback fired when the slot value changes. */
	onChange: (value: string) => void;
}
