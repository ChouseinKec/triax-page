import React, { useCallback, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import Slot from '../Slot/component';
import DropdownSelect from '@/components/Select/Dropdown/component';

// Utilities
import { generateSlotOptions, generateSlotVariations } from '@/utilities/style/slot';

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
    const allSlotVariations = useMemo(() => generateSlotVariations(variations, [...ValueSeparators]), [variations]);
    // Handles a change in a single slot, updating the overall value string
    const handleSlotChange = useCallback((newValue: string, currentValues: string[], slotIndex: number) => {
        const updatedValues = [...currentValues];
        updatedValues[slotIndex] = newValue;
        onChange(updatedValues.join(' '));
    }, [onChange]);

    // Render Slot components for each current value
    const currentSlots = useMemo(() => (
        values.map((slotValue, slotIndex) => {
            const slotVariations = allSlotVariations[slotIndex] || [];
            return (
                <Slot
                    key={slotIndex}
                    value={slotValue}
                    slotVariations={slotVariations}
                    onChange={(val) => { handleSlotChange(val, values, slotIndex) }}
                />
            );
        })
    ), [values, allSlotVariations, handleSlotChange]);

    // Render an extra Slot for the next possible slot (if any)
    const nextSlot = useMemo(() => {
        const nextIndex = values.length;
        if (nextIndex >= allSlotVariations.length) return null;
        const slotVariations = allSlotVariations[nextIndex] || [];
        const slotOptions = generateSlotOptions(slotVariations);
        const style: React.CSSProperties = {
            width: 'max-content',
            fontSize: 'var(--font-size-lg)',
        }
        return (
            <DropdownSelect
                key={nextIndex}
                value={''}
                options={slotOptions}
                placeholder="⋯"
                searchable={false}
                grouped={true}
                buttonStyle={style}
                onChange={(val: string) => handleSlotChange(val, values, nextIndex)}
            />
        );
    }, [values, allSlotVariations, handleSlotChange]);

    return (
        <div className={CSS.Slots} >
            {currentSlots}
            {nextSlot}
        </div>
    );
};

export default Slots;
