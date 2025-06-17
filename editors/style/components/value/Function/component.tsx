import React, { useCallback, useMemo } from 'react';

// Types
import type { FunctionValueProps } from './types';

// Components
import Value from '@/editors/style/components/value/component';
import DropdownReveal from '@/components/Reveal/Dropdown/component';
import DropdownSelect from '@/components/Select/Dropdown/component';

// Constants
import { createProperty } from '@/constants/style/property';

// Utilities
import { extractFunctionName, extractFunctionValue } from '@/utilities/style/function';
import { getValueToken } from '@/utilities/style/value';

const FunctionValue: React.FC<FunctionValueProps> = ({ value, options, onChange }) => {
    const safeName = extractFunctionName(value);
    const safeValue = extractFunctionValue(value);

    const functionOptions = useMemo(() =>
        options.filter(opt => opt.category === 'function'),
        [options]
    );

    const option = useMemo(() =>
        functionOptions.find(opt => getValueToken(value) === getValueToken(opt.value)),
        [functionOptions, value]
    );

    const property = useMemo(() =>
        option ? createProperty(option.name, option.syntax, '', '', 'flex') : undefined,
        [option]
    );

    // Handler uses latest safeName and onChange
    const handleValueChange = useCallback((newValue: string) => {
        if (!safeName) return;

        // If newValue is empty, clear the value
        if (newValue === '') {
            onChange('');
            return;
        }


        onChange(`${safeName}(${newValue})`);
    },
        [safeName, onChange]
    );

    const handleOptionChange = useCallback((newOption: string) => {
        onChange(newOption);
    }, [onChange]
    );

    // Error handling
    if (!option) return <div>Invalid: No matching function option.</div>;
    if (!safeName || !safeValue) return <div>Invalid: Malformed function value.</div>;
    if (!property) return <div>Invalid: Property creation failed.</div>;

    const renderOptionsSelect = () => {
        return (
            <DropdownSelect
                options={options}
                value={option.name}
                onChange={handleOptionChange}
                placeholder="Select Option"
                grouped={true}
                buttonStyle={{ marginBottom: 'var(--size-lg)' }}
            />
        )
    }


    return (
        <DropdownReveal
            closeOnChange={false}
            placeholder={`${safeName}()`}
            buttonTitle={`Edit Function`}
        >
            {renderOptionsSelect()}
            <Value
                value={safeValue}
                property={property}
                onChange={handleValueChange}
            />
        </DropdownReveal>
    );
};

export default FunctionValue;
