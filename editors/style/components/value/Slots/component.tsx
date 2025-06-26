import React, { useCallback, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import Slot from '../slot/component';
import DropdownSelect from '@/components/select/dropdown/component';
import DropdownReveal from '@/components/reveal/dropdown/component';

// Types
import type { SlotsProps } from './types';

/**
 * Slots Component
 * Renders a row of Slot components for each value slot, plus an extra dropdown for the next possible slot.
 * Handles incremental slot-based value editing for a CSS property.
 *
 * @param props - SlotsProps containing values, options, and onChange callback
 * @returns ReactElement - The rendered slot editor UI
 */
const Slots: React.FC<SlotsProps> = ({ values, options, onChange }) => {
    /**
     * Handles a change in a single slot, updating the overall slot values array.
     */
    const handleSlotChange = useCallback((newValue: string, slotIndex: number) => {
        const updatedValues = [...values];
        updatedValues[slotIndex] = newValue;
        onChange(updatedValues);
    }, [values, onChange]
    );

    /**
     * Renders Slot components for each current value slot.
     */
    const renderCurrentSlots = useCallback(() => {
        if (!values || values.length === 0) {
            return (
                <Slot
                    key={0}
                    value={''}
                    options={options[0]}
                    onChange={val => handleSlotChange(val, 0)}
                />
            );
        }

        return values.map((slotValue, slotIndex) => (
            <Slot
                key={slotIndex}
                value={slotValue}
                options={options[slotIndex]}
                onChange={val => handleSlotChange(val, slotIndex)}
            />
        ));
    }, [values, options, handleSlotChange]
    );

    /**
     * Renders an extra dropdown for the next possible slot (if any).
     */
    const renderNextSlot = useCallback(() => {
        if (!values || values.length === 0) return null;

        const nextIndex = values.length;
        const hasNext = nextIndex < options.length && options[nextIndex] && options[nextIndex].length > 0;
        if (!hasNext) return null;

        return (
            <DropdownSelect
                key={nextIndex}
                value={''}
                options={options[nextIndex]}
                placeholder="..."
                searchable={false}
                grouped={true}
                buttonStyle={{ fontSize: 'var(--font-size-lg)' }}
                buttonTitle="Select next slot"
                onChange={(val: string) => handleSlotChange(val, nextIndex)}
            />
        );
    }, [values, options, handleSlotChange]
    );

    /**
     * Calculates the maximum number of slots available.
     */
    const maxSlots = useMemo(
        () => options.filter(opt => opt && opt.length > 0).length,
        [options]
    );

    /**
     * Renders all current slots and the next slot dropdown, optionally inside a dropdown reveal.
     */
    const render = useCallback(() => {
        if (maxSlots > 1 && values.length > 0) {
            return (
                <DropdownReveal closeOnChange={false} placeholder={values.join(' ')}>
                    <div className={CSS.DropdownContainer}>
                        {renderCurrentSlots()}
                        {renderNextSlot()}
                    </div>
                </DropdownReveal>
            );
        }

        return (
            <>
                {renderCurrentSlots()}
                {renderNextSlot()}
            </>
        );
    }, [maxSlots, values, renderCurrentSlots, renderNextSlot]
    );

    return (
        <div className={CSS.Slots}>
            {render()}
        </div>
    );
};

export default React.memo(Slots);
