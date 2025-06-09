import React from 'react';

// Compoenents
import DropdownSelect from '@/components/Select/Dropdown/component';

// Types
import { KeywordValueProps } from './types';

const KeywordValue: React.FC<KeywordValueProps> = (props: KeywordValueProps) => {
    const { value, options, onChange } = props;

    return (
        <DropdownSelect
            value={value}
            options={options}
            placeholder="Select a keyword"
            searchable={false}
            grouped={false}
            onChange={onChange}
        />
    )

};

export default KeywordValue;
