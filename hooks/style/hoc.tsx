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
import { useStyleManager } from '@/hooks/style/manager';


interface INPUT {
    property: STYLE_PROPERTIES,
    value: string,
    type: 'length' | 'group' | 'number' | 'dropdown' | 'color' | 'radio' | 'position' | 'url' | 'variant',

    separator?: string,

    prefix?: string,
    suffix?: string,

}

const Input: React.FC<INPUT> = (props: INPUT): ReactElement | null => {
    const { property, value, type, separator, prefix, suffix } = props;
    const { setStyle, pasteStyle, copyStyle, resetStyle } = useStyleManager();
    const { addButton, addButtons } = useToolbar();
    const variantRef = useRef<VariantInputRef>(null);

    if (!type || !property) {
        devLog.error('Input requires type and property parameters');
        return null;
    }

    const options = useMemo(() => {
        return getStyleOptions(property)
    }, [getStyleOptions, property]
    )

    if (!options) {
        devLog.error(`No options available for property '${property}'`);
        return null;
    }

    const handleChange = useCallback((value: string) => {
        if (value == null) {
            devLog.error(`Invalid value for property '${property}': ${value}`);
            return;
        }

        if (value === '') {
            setStyle(property, '');
            return;
        }

        if (prefix) {
            value = `${prefix}${value}`;
        }

        if (suffix) {
            value = `${value}${suffix}`;
        }

        setStyle(property, value);
    }, [property, setStyle, prefix, suffix]
    );

    const handleReset = useCallback(() => {
        resetStyle(property);
    }, [property, resetStyle]
    );

    const handleCopy = useCallback(() => {
        copyStyle(property);
    }, [property, copyStyle]
    );

    const handlePaste = useCallback(() => {
        pasteStyle(property);
    }, [property, pasteStyle]
    );

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