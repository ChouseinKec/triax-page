import React, { memo, useCallback, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Types
import type { FunctionValueProps } from './types';

// Components
import Value from '@/editors/style/components/value/component';
import DropdownReveal from '@/components/reveal/dropdown/component';
import DropdownSelect from '@/components/select/dropdown/component';
import Error from '@/editors/style/components/value/error/component';

// Constants
import { createProperty } from '@/constants/style/property';

// Utilities
import { extractFunctionName, extractFunctionValue } from '@/utilities/style/function';
import { getValueToken } from '@/utilities/style/value';
import { devLog } from '@/utilities/dev';

/**
 * FunctionValue Component
 * 
 * A controlled input component for CSS function values (e.g., 'repeat(2, 1fr)', 'calc(100% - 20px)').
 * Intelligently parses function names and arguments, providing separate controls for each.
 * Supports function selection from categorized options and dynamic argument validation.
 * 
 * @param {FunctionValueProps} props - Component properties
 * @param {string} props.value - Current CSS function value (e.g., 'repeat(2, 1fr)')
 * @param {Array} props.options - Available function options with categories and syntax
 * @param {function} props.onChange - Callback for value changes
 * @returns {ReactElement} The rendered FunctionValue component
 */
const FunctionValue: React.FC<FunctionValueProps> = (props: FunctionValueProps) => {
    const {
        // Core
        value,
        options,
        onChange
    } = props;

    // Guard Clause
    if (!options || options.length === 0) {
        devLog.error('[DimensionValue] No options provided');
        return null;
    }

    if (value == null) {
        devLog.error('[DimensionValue] Invalid value provided, expected a string');
        return null;
    }


    /**
     * Extracts only function category options from the provided options array
     * 
     * @returns {Array} Filtered array of function options
     */
    const functionOptions = useMemo(() => {
        const filtered = options.filter(opt => opt.category === 'function');

        if (filtered.length === 0) {
            devLog.warn('[FunctionValue] No function category options found');
        }

        return filtered;
    },
        [options]
    );

    /**
     * Finds the matching option for the current value based on token matching
     * Falls back to the first function option if no match is found
     * 
     * @returns {Object|undefined} The matching option object or first available option
     */
    const currentOption = useMemo(() => {
        if (functionOptions.length === 0) return undefined;

        // Try to find exact match based on value token
        const match = functionOptions.find(opt =>
            getValueToken(value) === getValueToken(opt.value)
        );

        // Fallback to first option if no match found
        const selectedOption = match || functionOptions[0];

        if (!match && value) {
            devLog.info(`[FunctionValue] No exact match for "${value}", using fallback: ${selectedOption.name}`);
        }

        return selectedOption;
    },
        [functionOptions, value]
    );

    /**
     * Creates a property object from the selected option for syntax validation
     * Handles property creation errors gracefully
     * 
     * @returns {Object|undefined} The created property object or undefined
     */
    const property = useMemo(() => {
        if (!currentOption) return undefined;

        try {
            return createProperty(currentOption.name, currentOption.syntax);
        } catch (error) {
            devLog.error(`[FunctionValue] Failed to create property for ${currentOption.name}:`, error);
            return undefined;
        }
    },
        [currentOption]
    );

    /**
     * Extracts function name and arguments from the current value
     * Provides safe fallbacks for missing or malformed data
     * 
     * @returns {Object} Object containing parsed name and value with fallbacks
     */
    const extractedValue = useMemo(() => {
        const extractedName = extractFunctionName(value);
        const extractedValue = extractFunctionValue(value);

        return {
            name: extractedName,
            value: extractedValue
        };
    },
        [value]
    );

    /**
     * Handles changes to the function arguments/value
     * Preserves the current function name while updating the arguments
     * Validates input and handles edge cases (empty values, etc.)
     * 
     * @param {string} newValue - The new function arguments/value from input
     */
    const handleArgumentsChange = useCallback((newValue: string): void => {
        if (!extractedValue.name) {
            devLog.warn('[FunctionValue] No function name available for value change');
            return;
        }

        // Handle empty input - clear the entire function value
        if (newValue === '' || newValue === null || newValue === undefined) {
            onChange('');
            return;
        }

        // Construct the new function value
        const newFunctionValue = `${extractedValue.name}(${newValue})`;
        onChange(newFunctionValue);
    },
        [extractedValue.name, onChange]
    );

    /**
     * Handles changes to the selected function option
     * Updates the entire function when a different function type is selected
     * Preserves arguments when possible or uses default arguments
     * 
     * @param {string} newOptionValue - The new function option value from dropdown
     */
    const handleFunctionChange = useCallback((newOptionValue: string): void => {
        if (!newOptionValue) {
            onChange('');
            return;
        }

        onChange(newOptionValue);
    },
        [onChange]
    );

    // Error handling for missing or malformed data
    if (!extractedValue.name || !extractedValue.value) {
        return <Error message="[Function] Malformed function value - missing name or arguments." />;
    }

    if (!currentOption) {
        devLog.error('[FunctionValue] No matching function option available.');
        return null;
    }

    if (!property) {
        devLog.error('[FunctionValue] Property creation failed - invalid syntax definition.');
        return null;
    }

    return (
        <DropdownReveal closeOnChange={false} placeholder={`${extractedValue.name}()`} title="Edit Function">

            <div className={CSS.FunctionValue} role='presentation'>
                {/* Function selection dropdown */}
                <DropdownSelect
                    options={options}
                    value={currentOption.name}
                    onChange={handleFunctionChange}
                    title="Change Value Type"
                    placeholder="↺"
                    forcePlaceholder={true}
                    grouped={true}
                    aria-label="Change Value Type"
                />

                {/* Visual separator */}
                <span className={CSS.Separator} aria-hidden="true">⇄</span>

                {/* Function arguments editor */}
                <Value value={extractedValue.value} property={property} onChange={handleArgumentsChange} />
            </div>
        </DropdownReveal>
    );
};

export default memo(FunctionValue);
