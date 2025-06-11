import React, { useCallback, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import Slot from '../Slot/component';
import DropdownSelect from '@/components/Select/Dropdown/component';

// Types
import type { SlotsProps } from './types';

/**
 * Slots Component
 * Renders a row of Slot components for each value slot, plus an extra dropdown for the next possible slot.
 * Handles incremental slot-based value editing for a CSS property.
 *
 * @param values - Array of current slot values (e.g., ['10px', 'auto'])
 * @param variations - Array of all possible value definition strings for the property
 * @param onChange - Callback fired when any slot value changes (returns the new value string)
 * @returns ReactElement - The rendered slot editor UI
 */
const Slots: React.FC<SlotsProps> = (props: SlotsProps) => {
    const { values, options, onChange } = props;


    // Handles a change in a single slot, updating the overall value string
    const handleSlotChange = useCallback((newValue: string, currentValues: string[], slotIndex: number) => {
        // Create a new array with the updated slot value
        const updatedValues = [...currentValues];
        updatedValues[slotIndex] = newValue;
        // Join all slot values into a single value string
        onChange(updatedValues.join(' '));
    }, [onChange]);

    // Render Slot components for each current value slot
    const currentSlots = useMemo(() => (
        values.map((slotValue, slotIndex) => {
            return (
                <Slot
                    key={slotIndex}
                    value={slotValue}
                    options={options[slotIndex]}
                    onChange={(val) => { handleSlotChange(val, values, slotIndex); }}
                />
            );
        })
    ), [values, options, handleSlotChange]);

    // Render an extra dropdown for the next possible slot (if any)
    const nextSlot = useMemo(() => {
        const nextIndex = values.length;
        // If there are no more slot variations, return null
        if (nextIndex >= options.length) return null;
        // Generate options for the dropdown based on the slot variations
        const style: React.CSSProperties = {
            width: 'max-content',
            fontSize: 'var(--font-size-lg)',
        };
        return (
            <DropdownSelect
                key={nextIndex}
                value={''}
                options={options[nextIndex]}
                placeholder="⋯"
                searchable={false}
                grouped={true}
                buttonStyle={style}
                onChange={(val: string) => handleSlotChange(val, values, nextIndex)}
            />
        );
    }, [values, options, handleSlotChange]);

    // Render all current slots and the next slot dropdown
    return (
        <div className={CSS.Slots}>
            {currentSlots}
            {nextSlot}
        </div>
    );
};

export default Slots;
