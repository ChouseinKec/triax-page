// External imports
import React, { useCallback, memo, useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import GenericInput from '@/components/input/generic/component';
import SelectDropdown from '@/components/select/dropdown/component';

// Types
import { StylesEditorValueIntegerProps } from "@/editors/block/types/component";

// Utilities
import { devRender } from '@/utilities/dev';

/**
 * StylesEditorValueInteger Component
 * Renders an integer value input with optional unit selection dropdown.
 *
 * @param value - The current value (string or number)
 * @param onChange - Callback function to handle value changes
 * @param options - Array of available unit options
 * @param minValue - Minimum allowed value for the input
 * @param maxValue - Maximum allowed value for the input
 * @param isStrict - Whether to enforce strict numeric values
 * @returns The rendered integer input component
 */
const StylesEditorValueInteger: React.FC<StylesEditorValueIntegerProps> = ({ value, onChange, options, minValue, maxValue, isStrict }) => {
    if (typeof value !== 'string' && typeof value !== 'number') return devRender.error("[StylesEditorValueInteger] No value provided", { value });
    if (!onChange || typeof onChange !== 'function') return devRender.error("[StylesEditorValueInteger] Invalid onChange callback", { onChange });
    if (!options || !Array.isArray(options) || options.length === 0) return devRender.error("[StylesEditorValueInteger] No options provided", { options });

    // Default number is '0', used when no numeric value is provided in strict mode
    const DEFAULT_NUMBER = '0';

    // Handle changes to the numeric input
    const handleValueChange = useCallback((input: string): void => {
        if (input === '') return onChange(isStrict ? DEFAULT_NUMBER : '');

        const intValue = String(parseInt(input, 10));
        onChange(intValue);
    }, [onChange, isStrict]
    );

    // Handle changes to the unit dropdown
    const handleOptionChange = useCallback((input: string): void => {
        onChange(input);
    }, [onChange]
    );

    // Determine if dropdown should be shown based on available options
    const showDropdown = useMemo(() => {
        return options.length > 1;
    }, [options.length]
    );

    return (
        <div className={CSS.StylesEditorValueInteger}>

            {/* Main numeric input field */}
            <GenericInput
                value={value}
                min={minValue}
                max={maxValue}
                type='number'
                onChange={handleValueChange}
            />

            {/* Optional dropdown for alternative value types */}
            {showDropdown && (
                <SelectDropdown
                    options={options}
                    value={'number'}
                    onChange={(handleOptionChange)}
                    searchable={true}
                    groupable={true}
                />
            )}

        </div>
    );
};

export default memo(StylesEditorValueInteger);
