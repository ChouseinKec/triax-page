// Types
import type { CSSInputOptionDefinition } from '@/types/block/style/option';

/**
 * Props for the Slots component, which renders all slots (columns) for a CSS value,
 * including the next available slot for incremental input.
 *
 * @property values - The current values for each slot (column).
 * @property variations - All possible value pattern variations for the property.
 * @property onChange - Callback fired when the slot values change (array of slot values).
 */
export interface SlotsProps {
	/** The current values for each slot (column). */
	values: string[];

	/** All possible value pattern variations for the property. */
	options: CSSInputOptionDefinition[][];

	/** Callback fired when the slot values change (array of slot values). */
	onChange: (values: string[]) => void;
}
