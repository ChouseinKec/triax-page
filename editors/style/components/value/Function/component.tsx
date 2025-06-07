import React from 'react';
import { OptionData } from '@/types/option';
import DropdownSelect from '@/components/Select/Dropdown/component';
import DropdownReveal from '@/components/Reveal/Dropdown/component';

/**
 * Renders a dropdown for selecting a CSS function value.
 */
export interface FunctionValueProps {
    options: OptionData[];
    value: string;
    onChange: (value: string) => void;
}

const FunctionValue: React.FC<FunctionValueProps> = ({ value, options, onChange }) => {
    return (
        <DropdownReveal value={value}>
            <DropdownSelect
                value={value}
                options={options}
                placeholder="Select a function"
                searchable={true}
                grouped={true}
                onChange={onChange}
            />
        </DropdownReveal>
    );
};

export default FunctionValue;
