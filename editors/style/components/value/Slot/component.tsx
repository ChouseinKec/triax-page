import React, { useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import DimensionValue from '../dimension/component';
import FunctionValue from '../function/component';
import KeywordValue from '../keyword/component';
import NumberValue from '../number/component';

// Types
import type { SlotProps } from './types';
import type { FunctionOptionData } from '@/types/option';

// Utilities
import { getValueType } from '@/utilities/style/value';

/**
 * Slot Component
 * Renders the appropriate input component for a single value slot based on its type.
 * Handles function, keyword, dimension, and number value types.
 *
 * @param value - The current value for this slot (e.g., 'auto', '10px')
 * @param options - The available options for this slot (from createOptionsTable)
 * @param onChange - Callback fired when the slot value changes
 * @returns ReactElement - The rendered input for the slot
 */
const Slot: React.FC<SlotProps> = ({ value, options, onChange }) => {
    // Determine the value type for this slot (e.g., function, keyword, dimension, number)
    const valueType = getValueType(value);

    // Memoize the rendered input for this slot based on value type and options
    const slotInput = useMemo(() => {
        switch (valueType) {
            case 'function': {
                return <FunctionValue value={value} options={options} onChange={onChange} />;
            }
            case 'keyword':
                return <KeywordValue value={value} options={options} onChange={onChange} />;
            case 'dimension':
                return <DimensionValue value={value} options={options} onChange={onChange} />;
            case 'number':
                return <NumberValue value={value} options={options} onChange={onChange} />;
            default:
                return <div className={CSS.Error}>Unknown value type: {String(valueType)}</div>;
        }
    }, [valueType, value, onChange, options]);

    return (
        <div className={CSS.Slot}>
            {slotInput}
        </div>
    );
};

export default React.memo(Slot);
