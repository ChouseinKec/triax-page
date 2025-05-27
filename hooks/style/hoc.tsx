import { useCallback, ReactElement, useRef, useEffect, useMemo, memo } from 'react';

// Components
import LengthInput from '@/components/Input/Length/component';
import InputGroup from '@/components/Group/Input/component';
import NumberInput from '@/components/Input/Number/component';
import DropdownSelect from '@/components/Select/Dropdown/component';
import ColorSelect from '@/components/Select/Color/component';
import RadioSelect from '@/components/Select/Radio/component';
import StringInput from '@/components/Input/String/component';
import VariantInput, { VariantInputRef } from '@/components/Input/Variant/component';

// Utilities
import { getStyleOptions } from '@/utilities/style'
import { devLog } from '@/utilities/dev';

// Constants
import { STYLE_PROPERTIES } from '@/editors/style/constants/styles';
import { useToolbar } from '@/contexts/ToolbarContext';

interface INPUT {
    property: STYLE_PROPERTIES,
    value: string,
    type: 'length' | 'group' | 'number' | 'dropdown' | 'color' | 'radio' | 'position' | 'url' | 'variant',
    separator?: string,
    actions: {
        onChange: (property: STYLE_PROPERTIES, value: string) => void;
        onReset: (property: STYLE_PROPERTIES) => void;
        onCopy: (property: STYLE_PROPERTIES) => void;
        onPaste: (property: STYLE_PROPERTIES) => void;
    };
    prefix?: string,
    suffix?: string,
}

const Input: React.FC<INPUT> = (props: INPUT): ReactElement | null => {
    const { property, value, type, separator, prefix, suffix, actions } = props;
    const { onChange, onReset, onCopy, onPaste } = actions;
    const { addButton, addButtons } = useToolbar();
    const variantRef = useRef<VariantInputRef>(null);

    if (!type || !property) {
        devLog.error('Input requires type and property parameters');
        return null;
    }

    // Get the style options for the given property
    const options = useMemo(() => {
        return getStyleOptions(property)
    }, [getStyleOptions, property]
    )

    // Ensure options are available for the given property
    if (!options) {
        devLog.error(`No options available for property '${property}'`);
        return null;
    }

    /**
     * Handles changes to the style value for the given property.
     * This function is called when the input value changes.
     * @param {STYLE_PROPERTIES} property - The style property to change.
     * @param {string} value - The new value for the style property.
     * @returns {void}
    */
    const handleChange = useCallback((value: string) => {
        if (value == null) {
            devLog.error(`Invalid value for property '${property}': ${value}`);
            return;
        }

        if (value === '') {
            onChange(property, '');
            return;
        }

        if (prefix) {
            value = `${prefix}${value}`;
        }

        if (suffix) {
            value = `${value}${suffix}`;
        }

        onChange(property, value);
    }, [property, onChange, prefix, suffix]
    );

    /**
     * Handles resetting the style value for the given property.
     * This function is called when the reset button is clicked in the toolbar.
     * @param {STYLE_PROPERTIES} property - The style property to reset.
     * @returns {void}
    */
    const handleReset = useCallback(() => {
        onReset(property);
    }, [property, onReset]
    );

    /**
     * Handles copying the style value for the given property.
     * This function is called when the copy button is clicked in the toolbar.
     * @param {STYLE_PROPERTIES} property - The style property to copy.
     * @returns {void}
    */
    const handleCopy = useCallback(() => {
        onCopy(property);
    }, [property, onCopy]
    );

    /**
     * Handles pasting the style value for the given property.
     * This function is called when the paste button is clicked in the toolbar.
     * @param {STYLE_PROPERTIES} property - The style property to paste the value for.
     * @returns {void}
    */
    const handlePaste = useCallback(() => {
        onPaste(property);
    }, [property, onPaste]
    );

    // Add buttons to the toolbar for reset, copy, paste, and variant cycling
    useEffect(() => {

        addButtons([
            <button key={`${property}-reset`} title='Reset Style' onClick={handleReset}>✖</button>,
            <button key={`${property}-copy`} title='Copy Style' onClick={handleCopy}>⎘</button>,
            <button key={`${property}-paste`} title='Paste Style' onClick={handlePaste}>⎌</button>
        ]);

        if (type === 'variant') {
            addButton(
                <button
                    key={`${property}-variant-cycle`}
                    onClick={() => variantRef.current?.cycleVariant()}
                    title="Change Syntax"
                >
                    ⟳
                </button>
            );
        }
    }, []);

    // Render the appropriate input based on the type
    switch (type) {
        case 'length':
            return (
                <LengthInput
                    value={value}
                    onChange={handleChange}
                    options={options}
                />
            );

        case 'group':
            return (
                <InputGroup
                    value={value}
                    separator={separator || ' '}
                    onChange={handleChange}
                    options={options}
                />
            );

        case 'number':
            return (
                <NumberInput
                    value={value}
                    onChange={handleChange}
                />
            );

        case 'dropdown':
            return (
                <DropdownSelect
                    value={value}
                    onChange={handleChange}
                    options={options}
                />
            );

        case 'color':
            return (
                <ColorSelect
                    value={value}
                    onChange={handleChange}
                />
            );

        case 'radio':
            return (
                <RadioSelect
                    options={options}
                    value={value}
                    onChange={handleChange}
                />
            );

        case 'url':
            return (
                <StringInput
                    value={value}
                    onChange={handleChange}
                    pattern='url'
                />
            );

        case 'variant':
            return (
                <VariantInput
                    ref={variantRef}
                    value={value}
                    onChange={handleChange}
                    option={options[0]}
                    separator={separator || ' '}
                />
            );

        default:
            devLog.error(`Input does not support type '${type}' for property '${property}'`);
            return null;
    };

}


export default memo(Input);