import React, { useCallback, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import Slot from '../Slot/component';

// Utilities
import { createSlotOptions } from '@/utilities/style/value';

import { SlotsProps } from './types';

const SEPARATORS = [' ', ',', '/'];

const Slots: React.FC<SlotsProps> = ({ values, variations, onChange }) => {
    const slotOptions = useMemo(() => createSlotOptions(variations, SEPARATORS), [variations]);

    const handleChange = useCallback((values: string[], newValue: string, index: number) => {
        const newValues = [...values];
        newValues[index] = newValue;
        onChange(newValues.join(' '));
    }, [onChange]);

    const currentSlots = useMemo(() => (
        values.map((value, index) => {
            const options = slotOptions[index] || [];
            return (
                <Slot
                    key={index}
                    value={value}
                    options={options}
                    onChange={(newValue: string) => handleChange(values, newValue, index)}
                />
            );
        })
    ), [values, slotOptions, handleChange]);

    const nextSlot = useMemo(() => {
        const nextIndex = values.length;
        if (nextIndex >= slotOptions.length) return null;
        const options = slotOptions[nextIndex] || [];
        return (
            <Slot
                key={nextIndex}
                value=""
                options={options}
                onChange={(newValue: string) => {
                    const newValues = [...values, newValue];
                    onChange(newValues.join(' '));
                }}
            />
        );
    }, [values, slotOptions, onChange]);

    return (
        <div className={CSS.Slots}>
            {currentSlots}
            {nextSlot}
        </div>
    );
};

export default Slots;
