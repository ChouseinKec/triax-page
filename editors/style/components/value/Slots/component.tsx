import React from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import Slot from '../slot/component';
import DropdownSelect from '@/components/Select/Dropdown/component';

// Types
import type { SlotsProps } from './types';


/**
 * Slots Component
 * Renders a row of Slot components for each value slot, plus an extra dropdown for the next possible slot.
 * Handles incremental slot-based value editing for a CSS property.
 *
 * @param values - Array of current slot values (e.g., ['10px', 'auto'])
 * @param options - 2D array of options for each slot (from createOptionsTable)
 * @param onChange - Callback fired when any slot value changes (returns the new slot values array)
 * @returns ReactElement - The rendered slot editor UI
 */
const Slots: React.FC<SlotsProps> = (props: SlotsProps) => {
    const { values, options, onChange } = props;
    // Handles a change in a single slot, updating the overall slot values array
    const handleSlotChange = (newValue: string, slotIndex: number) => {
        const updatedValues = [...values];
        updatedValues[slotIndex] = newValue;
        onChange(updatedValues);
    }

    // Render Slot components for each current value slot
    const renderCurrentSlots = () => {
        return values.map((slotValue, slotIndex) => (
            // console.log(options),
            <Slot
                key={slotIndex}
                value={slotValue}
                options={options[slotIndex]}
                onChange={val => handleSlotChange(val, slotIndex)}
            />
        ));
    }

    // Render an extra dropdown for the next possible slot (if any)
    const renderNextSlot = () => {
        const nextIndex = values.length;
        if (nextIndex < options.length && options[nextIndex] && options[nextIndex].length > 0) {
            const style: React.CSSProperties = {
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
                    buttonTitle='Select next slot'
                    onChange={(val: string) => handleSlotChange(val, nextIndex)}
                />
            );
        }
        return null;
    }

    // Calculate the total number of slots to render, including the next slot dropdown
    const calculateSlotCount = () => {
        const maxSlots = options.length
        const hasNext = values.length < maxSlots;

        // If there are more options than current values,
        // we need to account for the next slot dropdown
        if (hasNext) {
            return values.length + 1;
        }

        // Otherwise, just return the current slot count
        return values.length;
    }

    // Render all current slots and the next slot dropdown
    return (
        <div
            className={CSS.Slots}
            style={{ '--slots-count': calculateSlotCount() } as React.CSSProperties}

        >
            {renderCurrentSlots()}
            {renderNextSlot()}
        </div>
    );
};

export default React.memo(Slots);
