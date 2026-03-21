"use client";
import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import ColorSelect from "@/shared/components/select/color/component";
import SelectDropdown from "@/shared/components/select/dropdown/component";

// Types
import type { TerminalComponentProps } from "@/core/block/style/types";


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
const ColorValue: React.FC<TerminalComponentProps> = ({ value, options, onChangeValue, onChangeOption }) => {
	const hasOptions = options && options.length > 1;

	return (
		<div className={CSS.ColorValue} data-has-options={hasOptions}>
			{/* Unit dropdown for the unit component */}
			<ColorSelect
				value={value}
				onChange={onChangeValue}
			/>

			{hasOptions && (
				<SelectDropdown
					options={options}
					value={"."}
					onChange={onChangeOption}
					searchable={true}
					groupable={true}
					title="Change Value Type"
				/>
			)}
		</div>
	);
};

ColorValue.displayName = "ColorValue";
export default memo(ColorValue);
