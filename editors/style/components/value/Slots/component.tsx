import React, { useCallback, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import Slot from '../Slot/component';

// Utilities
import { generateSlotVariations } from '@/utilities/style/slot';

// Constants
import { ValueSeparators } from '@/constants/style/value';

// Types
import { SlotsProps } from './types';

/**
 * Renders a row of Slot components for each value slot, plus an extra for the next possible slot.
 *
 * @param values - The current values for each slot (e.g., ['10px', 'auto'])
 * @param variations - The array of all possible value definition strings
 * @param onChange - Callback fired when any slot value changes
 */
const Slots: React.FC<SlotsProps> = ({ values, variations, onChange }) => {

    // Compute the possible options for each slot using the value definition variations
    const slotOptions = useMemo(() => generateSlotVariations(variations, [...ValueSeparators]), [variations]);

    // Handles a change in a single slot, updating the overall value string
    const handleSlotChange = useCallback((newValue: string, currentValues: string[], slotIndex: number) => {
        const updatedValues = [...currentValues];
        updatedValues[slotIndex] = newValue;
        onChange(updatedValues.join(' '));
    }, [onChange]);

    // Render Slot components for each current value
    const renderedSlots = useMemo(() => (
        values.map((slotValue, slotIndex) => {
            const options = slotOptions[slotIndex] || [];
            return (
                <Slot
                    key={slotIndex}
                    value={slotValue}
                    slotOptions={options}
                    onChange={val => handleSlotChange(val, values, slotIndex)}
                />
            );
        })
    ), [values, slotOptions, handleSlotChange]);

    // Render an extra Slot for the next possible slot (if any)
    const nextSlot = useMemo(() => {
        const nextIndex = values.length;
        if (nextIndex >= slotOptions.length) return null;
        const options = slotOptions[nextIndex] || [];
        return (
            <Slot
                key={nextIndex}
                value=""
                slotOptions={options}
                onChange={val => handleSlotChange(val, values, nextIndex)}
            />
        );
    }, [values, slotOptions, handleSlotChange]);

    return (
        <div className={CSS.Slots} >
            {renderedSlots}
            {nextSlot}
        </div>
    );
};

export default Slots;
