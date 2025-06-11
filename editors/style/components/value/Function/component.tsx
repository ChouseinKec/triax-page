import React, { useCallback } from 'react';

// Types
import { FunctionValueProps } from './types';

// Components
import Value from '@/editors/style/components/value/component';
import DropdownReveal from '@/components/Reveal/Dropdown/component';
// Constants
import { createProperty } from '@/constants/style/property';

// Utilities
import { extractFunctionName, extractFunctionValue } from '@/utilities/style/function';

const FunctionValue: React.FC<FunctionValueProps> = (props: FunctionValueProps) => {
    const { value, option, onChange } = props;
    const property = createProperty(option.name, option.syntax, '', '', 'flex');

    const safeValue = extractFunctionValue(value);
    const safeName = extractFunctionName(value);

    const handleChange = useCallback((newValue: string): void => {
        // Ensure the new value is a valid function format
        const newFunctionValue = `${safeName}(${newValue})`;

        console.log(newFunctionValue);
        onChange(newFunctionValue);
    }, [value, onChange]
    );


    if (!safeValue || !safeName) {
        return <div>Error: Invalid function value</div>;
    }


    return (
        <DropdownReveal closeOnChange={false} placeholder={safeName}>
            <Value
                value={safeValue}
                property={property}
                onChange={handleChange}
            />
        </DropdownReveal>

    );
};

export default FunctionValue;
