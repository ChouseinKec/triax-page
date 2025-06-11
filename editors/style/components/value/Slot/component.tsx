import React, { useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import DimensionValue from '../Dimension/component';
import FunctionValue from '../Function/component';
import KeywordValue from '../Keyword/component';
import NumberValue from '../Number/component';

// Types
import type { SlotProps } from './types';
import type { FunctionOptionData } from '@/types/option';

// Utilities
import { getValueType } from '@/utilities/style/value';

const Slot: React.FC<SlotProps> = (props: SlotProps) => {
    const { value, options, onChange } = props;
    const valueType = getValueType(value);

    /**
     * Renders the appropriate value input based on the detected valueType.
     */
    const children = useMemo(() => {
        if (valueType === 'function') {
            const functionOption = options.find(opt => opt.category === 'function') as FunctionOptionData | undefined;
            if (functionOption) {
                return <FunctionValue value={value} option={functionOption} onChange={onChange} />;
            }
            return <div className={CSS.Error}>Function option not found for value: {value}</div>;
        }

        if (valueType === 'keyword') return <KeywordValue value={value} options={options} onChange={onChange} />;
        if (valueType === 'dimension') return <DimensionValue value={value} options={options} onChange={onChange} />;
        if (valueType === 'number') return <NumberValue value={value} options={options} onChange={onChange} />;
    }, [valueType, value, onChange, options]);

    return (
        <div className={CSS.Slot} >
            {children}
        </div>
    );
};

export default Slot;
