import type { InputOptionData } from '@/types/option';
import type { CSSTokenGroups } from '@/types/style/token';






/**
 * Props for the Slot component, representing a single value slot (column) in the editor UI.
 *
 * @property value - The current value for this slot.
 * @property slotOptions - The available options for this slot (for dropdowns, etc.).
 * @property onChange - Callback fired when the slot value changes.
 */
export interface SlotProps {
	/** The current value for this slot. */
	value: string;
	/** The available options for this slot (for dropdowns, etc.). */
	options: InputOptionData[];
	/** Callback fired when the slot value changes. */
	onChange: (value: string) => void;
}
