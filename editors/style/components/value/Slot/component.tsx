import React, { useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import DropdownSelect from '@/components/Select/Dropdown/component';
import DimensionValue from '../Dimension/component';
import FunctionValue from '../Function/component';
import KeywordValue from '../Keyword/component';

// Types
import { SlotProps } from './types';

// Utilities
import { matchValueType } from '@/utilities/style/value';


const Slot: React.FC<SlotProps> = ({ value, options, onChange }) => {

    const valueTypes = matchValueType(value);


    const optionsSelect = useMemo(() => (
        <DropdownSelect
            value={value}
            options={options}
            placeholder="Select a value"
            searchable={true}
            grouped={true}
            onChange={onChange}
        />
    ), [options, value, onChange]);

    const valueInput = useMemo(() => {
        if (valueTypes === 'function') {
            return <FunctionValue value={value} options={options} onChange={onChange} />;
        } else if (valueTypes === 'keyword') {
            return <KeywordValue value={value} />;
        } else if (valueTypes === 'dimension') {
            return <DimensionValue value={value} options={options} onChange={onChange} />;
        }
    }, [valueTypes, value, onChange]);




    return (
        <div className={CSS.Slot}>
            {optionsSelect}
            {valueInput}
        </div>
    );


};

export default Slot;
