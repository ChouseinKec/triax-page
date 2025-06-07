import React, { memo, ReactElement, useCallback } from 'react';
import { ChromePicker, ColorResult } from 'react-color';

// Components
import Dropdown from '@/components/Reveal/Dropdown/component';

// Types
import { COLOR_SELECT } from '@/components/Select/Color/types';

// Utilities
import { clearSpaces } from '@/utilities/string/string';

/**
 * ColorSelect Component
 * 
 * A controlled color picker component that allows users to pick a color.
 * The color is represented in RGBA format and can be customized via a `Dropdown` component.
 *
 * @component
 * @param {COLOR_SELECT} props - Component props
 * @param {string} props.value - The current color value (in RGBA format)
 * @param {(value: string) => void} props.onChange - Handler function for when the color changes
 * @param {string} [props.placeholder='Pick'] - Placeholder text for the dropdown toggle
 * @returns {ReactElement} - The rendered color picker component
 *
 * @example
 * <ColorSelect value="rgba(255, 0, 0, 1)" onChange={(color) => setColor(color)} />
 */
const ColorSelect: React.FC<COLOR_SELECT> = ({ value, onChange, placeholder = 'Pick' }): ReactElement => {
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
        <Dropdown value={value} buttonStyle={{ backgroundColor: value }} closeOnChange={false} placeholder={placeholder} >
            <ChromePicker disableAlpha={false} color={value} onChange={handleChange} />
        </Dropdown>

    );
};

export default memo(ColorSelect);