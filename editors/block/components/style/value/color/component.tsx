"use client";
import React, { memo, useCallback } from "react";

// Styles
import CSS from "@/editors/block/components/style/value/color/styles.module.scss";

// Components
import ColorSelect from "@/components/select/color/component";

// Types
import type { StylesEditorValueColorProps } from "@/editors/block/types/component";

// Utilities
import { devRender } from "@/utilities/dev";

/**
 * StylesEditorValueColor Component
 * Renders a color picker component for CSS color values with validation and user-friendly interface.
 *
 * @param value - Current CSS color value (e.g., "#ff0000", "rgb(255,0,0)")
 * @param onChange - Callback when the color value changes
 * @returns The rendered color picker component
 */
const StylesEditorValueColor: React.FC<StylesEditorValueColorProps> = ({ value, onChange }) => {
	if (typeof value !== "string") return devRender.error("[StylesEditorValueColor] No value provided", { value });
	if (!onChange || typeof onChange !== "function") return devRender.error("[StylesEditorValueColor] Invalid onChange callback", { onChange });

	// Handle color value changes
	const handleChange = useCallback((newValue: string) => {
		onChange(newValue);
	}, [onChange]
	);

	return (
		<div className={CSS.StylesEditorValueColor}>
			<ColorSelect
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
};

export default memo(StylesEditorValueColor);
