import React, { useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import DimensionValue from '../Dimension/component';
import FunctionValue from '../Function/component';
import KeywordValue from '../Keyword/component';
import NumberValue from '../Number/component';

// Types
import { SlotProps } from './types';

// Utilities
import { getValueType } from '@/utilities/style/value';
import { generateSlotOptions } from '@/utilities/style/slot';

const Slot: React.FC<SlotProps> = (props: SlotProps) => {
    const { value, slotVariations, onChange } = props;
    const valueType = getValueType(value);

    // Generate slotOptions for this slot from its variations
    const slotOptions = useMemo(() => generateSlotOptions(slotVariations), [slotVariations]);

    /**
     * Renders the appropriate value input based on the detected valueType.
     * If no valueType is detected, show a dropdown of possible slot options.
     */
    const children = useMemo(() => {
        if (valueType === 'function') return <FunctionValue value={value} options={slotOptions} onChange={onChange} />;
        if (valueType === 'keyword') return <KeywordValue value={value} options={slotOptions} onChange={onChange} />;
        if (valueType === 'dimension') return <DimensionValue value={value} options={slotOptions} onChange={onChange} />;
        if (valueType === 'number') return <NumberValue value={value} options={slotOptions} onChange={onChange} />;
    }, [valueType, value, onChange, slotOptions]);

    return (
        <div className={CSS.Slot} >
            {children}
        </div>
    );
};

export default Slot;
