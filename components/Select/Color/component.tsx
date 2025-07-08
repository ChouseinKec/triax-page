import React, { memo, ReactElement, useCallback } from 'react';
import { ChromePicker, ColorResult } from 'react-color';

// Components
import DropdownReveal from '@/components/reveal/dropdown/component';

// Types
import { ColorSelectProps } from '@/components/select/color/types';

// Utilities
import { clearSpaces } from '@/utilities/string/string';

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
 *
 * @example
 * <ColorSelect value="rgba(255, 0, 0, 1)" onChange={(color) => setColor(color)} />
 */
const ColorSelect: React.FC<ColorSelectProps> = (props: ColorSelectProps): ReactElement => {
    const {
        value,
        onChange,
        placeholder = 'Pick'
    } = props;
    /**
     * Handles color change from the ChromePicker.
     * Memoized to prevent unnecessary re-creations.
     * 
     * @param {ColorResult} color - The selected color object from the ChromePicker
    */
    const handleChange = useCallback((color: ColorResult) => {
        const rgbaColor = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
        if (onChange) {
            onChange(clearSpaces(rgbaColor)); // Pass the new color to the parent
        }
    }, [onChange]
    );

    return (
        <DropdownReveal value={value} closeOnChange={false} placeholder={placeholder} >
            <ChromePicker disableAlpha={false} color={value} onChange={handleChange} />
        </DropdownReveal>

    );
};

export default memo(ColorSelect);