import type { InputOptionData } from '@/types/option';

/**
 * Props for the Slots component, which renders all slots (columns) for a CSS value,
 * including the next available slot for incremental input.
 *
 * @property values - The current values for each slot (column).
 * @property variations - All possible value pattern variations for the property.
 * @property onChange - Callback fired when the slot values change (joined as a string).
 */
export interface SlotsProps {
    /** The current values for each slot (column). */
    values: string[];
    /** All possible value pattern variations for the property. */
    options: InputOptionData[][];
    /** Callback fired when the slot values change (joined as a string). */
    onChange: (value: string) => void;
}
