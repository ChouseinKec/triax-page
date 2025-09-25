"use client";
import React, { memo, useCallback } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import ColorSelect from "@/src/shared/components/select/color/component";

// Types
import type { BlockStylesValueColorProps } from "@/src/page-builder/ui/inspectors/block/types";

// Utilities
import { devRender } from "@/src/shared/utilities/dev";

/**
 * BlockStylesValueColor Component
 * Renders a color picker component for CSS color values with validation and user-friendly interface.
 *
 * @param value - Current CSS color value (e.g., "#ff0000", "rgb(255,0,0)")
 * @param onChange - Callback when the color value changes
 * @returns The rendered color picker component
 */
const BlockStylesValueColor: React.FC<BlockStylesValueColorProps> = ({ value, onChange }) => {
	if (typeof value !== "string") return devRender.error("[BlockStylesValueColor] No value provided", { value });
	if (!onChange || typeof onChange !== "function") return devRender.error("[BlockStylesValueColor] Invalid onChange callback", { onChange });

	// Handle color value changes
	const handleChange = useCallback((newValue: string) => {
		onChange(newValue);
	}, [onChange]
	);

	return (
		<div className={CSS.BlockStylesValueColor}>
			<ColorSelect
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
};

export default memo(BlockStylesValueColor);
