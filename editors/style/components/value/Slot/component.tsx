import React, { useCallback, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import DropdownSelect from '@/components/Select/Dropdown/component';
import DimensionValue from '../Dimension/component';
import FunctionValue from '../Function/component';
import KeywordValue from '../Keyword/component';
import NumberValue from '../Number/component';

// Types
import { SlotProps } from './types';

// Utilities
import { getValueType } from '@/utilities/style/value';
import { expandSlotOptions } from '@/utilities/style/slot';

const Slot: React.FC<SlotProps> = (props: SlotProps) => {
    const { value, slotOptions, onChange } = props;
    const type = getValueType(value);

    // Expand slotOptions to OptionData[] for use in value components
    const options = useMemo(() => expandSlotOptions(slotOptions), [slotOptions]);


    const handleVariationChange = useCallback((input: string) => {
        onChange(input);
    }, [onChange]);


    /**
     * Renders the appropriate value input based on the detected type.
     * If no type is detected, show a dropdown of possible slot options.
     */
    const children = useMemo(() => {
        if (!type) {
            return (
                <DropdownSelect
                    value={value}
                    options={options}
                    placeholder="Variation"
                    searchable={false}
                    grouped={true}
                    onChange={handleVariationChange}
                />
            );
        }
        if (type === 'function') return <FunctionValue value={value} options={options} onChange={onChange} />;
        if (type === 'keyword') return <KeywordValue value={value} options={options} onChange={onChange} />;
        if (type === 'dimension') return <DimensionValue value={value} options={options} onChange={onChange} />;
        if (type === 'number') return <NumberValue value={value} onChange={onChange} />;
    }, [type, value, onChange, options, handleVariationChange]);

    return (
        <div className={CSS.Slot} >
            {children}
        </div>
    );
};

export default Slot;
