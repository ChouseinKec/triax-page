"use client";

// External imports
import React, { memo, useCallback } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import ColorSelect from "@/components/select/color/component";

// Types
import { ColorValueProps } from "./types";

// Utilities
import { devLog } from "@/utilities/dev";

/**
 * Color Component
 * 
 * A controlled input component for CSS dimension values (e.g., "10px", "2rem", "100%").
 * Intelligently splits values into numeric and unit components for separate editing.
 * Supports groupable unit categories and validation for numeric ranges.
 *
 * @component
 * @param {ColorValueProps} props - Component properties
 * @param {string} [props.value=""] - Current CSS dimension value (e.g., "10px")
 * @param {function} [props.onChange] - Callback for value changes
 * @param {Array} [props.options=[]] - Available unit options with categories
 * @param {number} [props.min=-Infinity] - Minimum allowed numeric value
 * @param {number} [props.max=Infinity] - Maximum allowed numeric value
 * @returns {ReactElement} The rendered Color component
 */
const Color: React.FC<ColorValueProps> = (props: ColorValueProps) => {
	const {
		// Core
		value,
		onChange,

	} = props;

	if (value == null) {
		devLog.error("[Color] Invalid value provided, expected a string");
		return null;
	}

	const handleChange = useCallback((newValue: string) => {
		onChange(newValue);
	}, [onChange]);


	return (
		<div className={CSS.Color} role="representation">
			<ColorSelect
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
};

export default memo(Color);
