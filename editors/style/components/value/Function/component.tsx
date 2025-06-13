import React, { useCallback, useMemo } from 'react';

// Types
import type { FunctionValueProps } from './types';
import type { FunctionOptionData } from '@/types/option';

// Components
import Value from '@/editors/style/components/value/component';
import DropdownReveal from '@/components/Reveal/Dropdown/component';
// Constants
import { createProperty } from '@/constants/style/property';

// Utilities
import { extractFunctionName, extractFunctionValue } from '@/utilities/style/function';
import { getValueToken } from '@/utilities/style/value';

const FunctionValue: React.FC<FunctionValueProps> = ({ value, options, onChange }) => {
    // Memoize function options and selected option
    const functionOptions = useMemo(() =>
        options.filter(opt => opt.category === 'function'),
        [options]
    );

    const option = useMemo(() =>
        functionOptions.find(opt => getValueToken(value) === getValueToken(opt.value)),
        [functionOptions, value]
    );

    const safeName = extractFunctionName(value);
    const safeValue = extractFunctionValue(value);


    // Memoize property creation
    const property = useMemo(() =>
        option ? createProperty(option.name, option.syntax, '', '', 'flex') : undefined,
        [option]
    );


    console.log(property);


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

    // Error handling
    if (!option) return <div>Invalid: No matching function option.</div>;
    if (!safeName || !safeValue) return <div>Invalid: Malformed function value.</div>;
    if (!property) return <div>Invalid: Property creation failed.</div>;

    return (
        <DropdownReveal closeOnChange={false} placeholder={`${safeName}()`}>
            <Value
                value={safeValue}
                property={property}
                onChange={handleValueChange}
            />
        </DropdownReveal>
    );
};

export default FunctionValue;
