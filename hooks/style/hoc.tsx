import { useCallback, ReactElement, useRef, useEffect, useMemo, memo, useState } from 'react';

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
    const { setStyle } = useStyleManager();
    const variantRef = useRef<VariantInputRef>(null);
    const inputRef = useRef<HTMLDivElement>(null);


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

    switch (type) {
        case 'length':
            return (
                    <LengthInput
                        ref={inputRef}
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

            let _value = value;
            if (prefix) _value = _value.replace(prefix, '');
            if (suffix) _value = _value.replace(suffix, '');


            return (
                <StringInput
                    value={_value}
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