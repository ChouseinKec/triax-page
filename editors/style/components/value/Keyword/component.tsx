import React from 'react';

// Components
import DropdownSelect from '@/components/select/dropdown/component';
import RadioSelect from '@/components/select/radio/component';

// Types
import { KeywordValueProps } from './types';

const KeywordValue: React.FC<KeywordValueProps> = (props: KeywordValueProps) => {
    const { value, options, onChange } = props;

    const hasIcon = options.every(option => option.icon);

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
                placeholder="N/A"
                searchable={false}
                grouped={true}
                onChange={onChange}
                title='Select Keyword Value'
                ariaLabel='Select Keyword Value'
            />
    )

};

export default KeywordValue;
