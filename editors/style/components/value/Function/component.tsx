import React, { useCallback, useMemo } from 'react';

// Style
import CSS from './styles.module.css';

// Types
import type { FunctionValueProps } from './types';

// Components
import Value from '@/editors/style/components/value/component';
import DropdownReveal from '@/components/Reveal/Dropdown/component';
import DropdownSelect from '@/components/Select/Dropdown/component';
import Error from '@/editors/style/components/value/error/component';

// Constants
import { createProperty } from '@/constants/style/property';

// Utilities
import { extractFunctionName, extractFunctionValue } from '@/utilities/style/function';
import { getValueToken } from '@/utilities/style/value';
import { convertSyntax } from '@/utilities/style/parse';
import { getTokenBase } from '@/utilities/style/token';

/**
 * FunctionValue Component
 * Renders an input for CSS function values (e.g., `repeat(2, 1fr)`).
 * Allows selecting a function and editing its arguments.
 *
 * @param props - FunctionValueProps containing value, options, and onChange callback
 * @returns ReactElement - The rendered function value input
 */
const FunctionValue: React.FC<FunctionValueProps> = ({ value, options, onChange }) => {
    /**
     * Filter options to only include those with category 'function'.
     */
    const functionOptions = useMemo(() => {
        return options.filter(opt => opt.category === 'function');
    }, [options]
    );

    /**
     * Find the matching option for the current value.
     * Fallback to the first function option if no match is found.
     */
    const option = useMemo(() => {
        const match = functionOptions.find(
            opt => getValueToken(value) === getValueToken(opt.value)
        );
        return match || functionOptions[0];
    }, [functionOptions, value]
    );

    /**
     * Create a property object from the selected option.
     */
    const property = useMemo(() => {
        return option ? createProperty(option.name, option.syntax) : undefined;
    }, [option]
    );

    // Extract function name and value from the input string
    const extractedName = extractFunctionName(value);
    const extractedValue = extractFunctionValue(value);

    // Determine default name and value from the option/property
    const defaultName = option ? getTokenBase(option.name) : '';
    const defaultValue = property ? convertSyntax(property.syntaxParsed[0]) : '';

    // Use extracted or default values safely
    const safeName = extractedName || defaultName;
    const safeValue = extractedValue || defaultValue;

    /**
     * Handle changes to the function argument value.
     * If the new value is empty, clear the function value.
     */
    const handleValueChange = useCallback((newValue: string) => {
        if (!safeName) return;
        if (newValue === '') {
            onChange('');
            return;
        }
        onChange(`${safeName}(${newValue})`);
    },
        [safeName, onChange]
    );

    /**
     * Handle changes to the selected function option.
     */
    const handleOptionChange = useCallback((newOption: string) => {
        onChange(newOption);
    },
        [onChange]
    );

    // Error handling for missing or malformed data
    if (!option) return <Error message="[Function]: No matching function option." />;
    if (!safeName || !safeValue) return <Error message="[Function]: Malformed function value." />;
    if (!property) return <Error message="[Function]: Property creation failed." />;

    /**
     * Render the dropdown select for function options.
     */
    const renderOptionsSelect = () => (
        <DropdownSelect
            options={options}
            value={option.name}
            onChange={handleOptionChange}
            placeholder="Select Option"
            grouped={true}
        />
    );

    return (
        <DropdownReveal
            closeOnChange={false}
            placeholder={`${safeName}()`}
            buttonTitle="Edit Function"
        >
            <div className={CSS.FunctionValue}>
                {renderOptionsSelect()}
                <span className={CSS.Separator}>|</span>
                <Value
                    value={safeValue}
                    property={property}
                    onChange={handleValueChange}
                />
            </div>
        </DropdownReveal>
    );
};

export default FunctionValue;
