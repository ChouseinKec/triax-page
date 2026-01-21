"use client";

import React, { memo, ReactElement } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { ColorSelectProps } from "./types";

// Hooks
import { useDebouncedCallback } from "@/shared/hooks/utility/useCallback";

/**
 * ColorSelect Component
 *
 * A controlled color picker component that provides a native HTML color input with debounced change handling.
 * Displays a visual color preview and allows users to select colors with smooth interaction feedback.
 *
 * @param  props - Component properties
 * @param  props.value - The current color value in RGBA format
 * @param  props.onChange - Callback function triggered when the color changes
 * @returns Rendered color picker with visual preview and input control
 *
 * @note Uses 100ms debouncing to prevent excessive callback invocations during color selection
 */
const ColorSelect: React.FC<ColorSelectProps> = ({
    value,
    onChange,
}): ReactElement => {
    const debouncedOnChange = useDebouncedCallback(onChange, 100);
    
    // Handle input change events with debounced callback
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        debouncedOnChange(event.target.value);
    };

    return (
        <div className={`${CSS.ColorSelect} ColorSelect`} style={{ backgroundColor: value }}>
            <input className={`${CSS.Input} Input`} type="color" value={value} onChange={handleChange} />
        </div>
    );

};

ColorSelect.displayName = "ColorSelect";
export default memo(ColorSelect);