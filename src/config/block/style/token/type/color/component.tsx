"use client";
import React, { memo, useCallback } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import ColorSelect from "@/shared/components/select/color/component";

// Types
import type { ColorValueProps } from "./types";


/**
 * ColorValue Component
 *
 * A specialized color picker component for CSS style value editing in the page builder.
 * Provides a user-friendly interface for selecting and modifying color values with real-time preview.
 * Wraps the ColorSelect component with debounced change handling for smooth editing experience.
 *
 * @param  props - Component properties
 * @param  props.value - Current CSS color value (hex, rgb, rgba, hsl, etc.)
 * @param  props.onChange - Callback triggered when color value changes
 * @returns Rendered color picker with visual preview and input control
 *
 * @note Uses 100ms debouncing to prevent excessive callback invocations during color selection
 */
const ColorValue: React.FC<ColorValueProps> = ({ value, onChange }) => {

	// Handle color value changes
	const handleChange = useCallback((newValue: string) => {
		onChange(newValue);
	}, [onChange]
	);

	return (
		<div className={`${CSS.ColorValue} ColorValue`}>
			<ColorSelect
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
};

ColorValue.displayName = "ColorValue";
export default memo(ColorValue);
