import React from 'react';

// Components
import DropdownSelect from '@/components/Select/Dropdown/component';
import RadioSelect from '@/components/Select/Radio/component';

// Types
import { KeywordValueProps } from './types';

const KeywordValue: React.FC<KeywordValueProps> = (props: KeywordValueProps) => {
    const { value, options, onChange } = props;

    const hasIcon = options.some(option => option.icon);

    return (
        hasIcon ?
            <RadioSelect
                value={value}
                options={options}
                onChange={onChange}
            />
            :
            <DropdownSelect
                value={value}
                options={options}
                placeholder="Select"
                searchable={false}
                grouped={true}
                onChange={onChange}
                buttonTitle='Select Option'
            />
    )

};

export default KeywordValue;
