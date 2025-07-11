import React, { memo, ReactElement, useCallback } from "react";

// Styles
import CSS from './styles.module.css';

// Types
import { ColorSelectProps } from '@/components/select/color/types';

// Utilities
import { clearSpaces } from '@/utilities/string';

// Hooks
import { useDebouncedCallback } from '@/hooks/hooks';

/**
 * ColorSelect Component
 * 
 * A controlled color picker component that allows users to pick a color.
 * The color is represented in RGBA format and can be customized via a `DropdownReveal` component.
 *
 * @component
 * @param {ColorSelectProps} props - Component props
 * @param {string} props.value - The current color value (in RGBA format)
 * @param {(value: string) => void} props.onChange - Handler function for when the color changes
 * @param {string} [props.placeholder='Pick'] - Placeholder text for the DropdownReveal toggle
 * @returns {ReactElement} - The rendered color picker component
 */
const ColorSelect: React.FC<ColorSelectProps> = (props: ColorSelectProps): ReactElement => {
    const {
        value,
        onChange,
    } = props;

    const debouncedOnChange = useDebouncedCallback(onChange, 100);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const color = clearSpaces(event.target.value);
        debouncedOnChange(color);
    }, [debouncedOnChange]);


    return (
        <div className={CSS.ColorSelect} style={{ backgroundColor: value }}>
            <input className={CSS.Input} type='color' value={value} onChange={handleChange} />
        </div>
    );

};

export default memo(ColorSelect);